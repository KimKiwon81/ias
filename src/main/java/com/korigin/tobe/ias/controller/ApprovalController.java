package com.korigin.tobe.ias.controller;

import javax.servlet.http.HttpSession;

import com.korigin.tobe.ias.dto.ApprovalDocDTO;
import com.korigin.tobe.ias.dto.ApprovalSearchDTO;
import com.korigin.tobe.ias.service.ApprovalService;
import com.korigin.tobe.ias.service.CodeService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus; // HttpStatus 임포트
import org.springframework.http.ResponseEntity; // ResponseEntity 임포트
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody; // ResponseBody 임포트
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Controller
@Slf4j
public class ApprovalController {

    private final ApprovalService approvalService;
    private final CodeService codeService;

    public ApprovalController(ApprovalService approvalService, CodeService codeService) {
        this.approvalService = approvalService;
        this.codeService = codeService;
    }

    @GetMapping("/approvalList")
    public String approvalList(@ModelAttribute ApprovalSearchDTO searchDTO, Model model, HttpSession session){
        // 기존 세션 정보 처리...
        String userId = (String) session.getAttribute("userId");
        String userName = (String) session.getAttribute("userName");
        String deptCd = (String) session.getAttribute("deptCd");
        String role = (String) session.getAttribute("role");

        model.addAttribute("userId", userId);
        model.addAttribute("userName", userName);
        model.addAttribute("deptCd", deptCd);
        model.addAttribute("role", role);

        // 코드 목록을 Model에 추가 (JSP 드롭다운 필드용)
        model.addAttribute("approvalTypes", codeService.getCodeListByGrpCode("APPROV_TY"));
        model.addAttribute("docStatuses", codeService.getCodeListByGrpCode("DOC_STAT"));

        // 초기 페이지 로딩 시에는 전체 목록을 조회하여 전달 (이 부분은 AJAX 검색으로 대체될 예정이지만, 초기 로딩을 위해 유지)
        LocalDate today = LocalDate.now();
        LocalDate aWeekAgo = today.minusDays(7);
        searchDTO.setRegDateFrom(aWeekAgo);
        searchDTO.setRegDateTo(today);
        List<ApprovalDocDTO> approvalDocList = approvalService.getApprovalDocList(searchDTO);
        model.addAttribute("approvalDocList", approvalDocList);
        
        // 검색 폼에 이전 검색 값을 유지할 수 있도록 searchDTO 객체를 다시 모델에 추가
        model.addAttribute("searchDTO", searchDTO);
        
        log.info("결재 목록 조회 (JSP 뷰). 검색 조건: {}", searchDTO);
        return "approvalList"; // approvalList.jsp로 포워딩
    }

    /**
     * [추가] AJAX 요청으로 결재 문서 목록을 검색하여 JSON 형태로 반환합니다.
     * @param searchDTO 검색 조건을 담은 DTO (쿼리 파라미터로 바인딩)
     * @return 검색된 ApprovalDocDTO 리스트를 JSON 형태로 반환 (ResponseEntity 사용)
     */
    @GetMapping("/approvalList/searchAjax")
    @ResponseBody // 이 메서드의 반환 값을 HTTP 응답 본문에 직접 작성하도록 지시 (Jackson이 JSON으로 변환)
    public ResponseEntity<List<ApprovalDocDTO>> searchApprovalDocsAjax(@ModelAttribute ApprovalSearchDTO searchDTO) {
        try {
            log.info("AJAX 결재 문서 검색 시작. 검색 조건: {}", searchDTO);
            List<ApprovalDocDTO> approvalDocList = approvalService.getApprovalDocList(searchDTO);
            log.info("AJAX 결재 문서 검색 완료. {}개 문서 반환.", approvalDocList.size());
            return ResponseEntity.ok(approvalDocList); // HTTP 200 OK와 함께 JSON 데이터 반환
        } catch (Exception e) {
            log.error("AJAX 결재 문서 검색 중 오류 발생", e);
            // 오류 발생 시 HTTP 500 Internal Server Error와 함께 본문 없이 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/approvalForm")
    public String approvalForm(Model model, HttpSession session) {
        ApprovalDocDTO approvalDoc = new ApprovalDocDTO();
        String userId = (String) session.getAttribute("userId");

        if (userId != null) {
            approvalDoc.setReqUserId(userId);
        } else {
            log.warn("세션에 userId가 없습니다. 결재 신청 폼 접근 시 로그인 필요.");
            // return "redirect:/login"; // 실제 환경에서는 로그인 페이지로 리다이렉트하는 것이 좋습니다.
        }
        model.addAttribute("approvalDoc", approvalDoc);

        // 코드 목록을 Model에 추가 (JSP 드롭다운 필드용)
        model.addAttribute("approvalTypes", codeService.getCodeListByGrpCode("APPROV_TY"));
        model.addAttribute("halfDayTypes", codeService.getCodeListByGrpCode("HLF_TY"));
        
        log.info("결재 신청 폼 접근. 신청자 ID: {}", userId);
        return "approvalForm";
    }

    @PostMapping("/submit")
    public String submitApprovalDoc(@ModelAttribute ApprovalDocDTO approvalDoc,
                                    HttpSession session,
                                    RedirectAttributes redirectAttributes) {

        String currentUserId = (String) session.getAttribute("userId");

        try {
            if (currentUserId != null) {
                approvalDoc.setReqUserId(currentUserId);
            } else {
                throw new IllegalStateException("세션에 사용자 ID가 없습니다. 등록할 수 없습니다.");
            }
            
            log.info("결재 신청 데이터: {}", approvalDoc);
            
            approvalService.registerApprovalDoc(approvalDoc);

            redirectAttributes.addFlashAttribute("message", "결재 문서가 성공적으로 제출되었습니다.");
            return "redirect:/approvalList";
        } catch (IllegalArgumentException e) {
            log.error("결재 신청 실패 (데이터 문제): {}", e.getMessage());
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            return "redirect:/approvalForm";
        } catch (IOException e) {
            log.error("결재 신청 실패 (파일 업로드 오류): {}", e.getMessage());
            redirectAttributes.addFlashAttribute("errorMessage", "파일 업로드 중 오류가 발생했습니다: " + e.getMessage());
            return "redirect:/approvalForm";
        } catch (Exception e) {
            log.error("결재 신청 실패 (일반 오류): {}", e.getMessage(), e);
            redirectAttributes.addFlashAttribute("errorMessage", "결재 신청 중 알 수 없는 오류가 발생했습니다: " + e.getMessage());
            return "redirect:/approvalForm";
        }
    }

    @PostMapping("/delete")
    public String deleteApprovalDoc(@RequestParam("approvDocId") String approvDocId,
                                    HttpSession session,
                                    RedirectAttributes redirectAttributes) {

        String currentUserId = (String) session.getAttribute("userId");

        if (currentUserId == null) {
            redirectAttributes.addFlashAttribute("errorMessage", "로그인이 필요합니다.");
            return "redirect:/login";
        }

        try {
            approvalService.deleteApprovalDoc(approvDocId, currentUserId);
            redirectAttributes.addFlashAttribute("message", "결재 문서가 성공적으로 삭제(비활성화)되었습니다.");
        } catch (SecurityException e) {
            log.warn("결재 문서 삭제 권한 없음: {}. 시도자: {}", e.getMessage(), currentUserId);
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("결재 문서 삭제 실패 (데이터 문제): {}", e.getMessage());
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        } catch (Exception e) {
            log.error("결재 문서 삭제 중 알 수 없는 오류 발생: {}", e.getMessage(), e);
            redirectAttributes.addFlashAttribute("errorMessage", "결재 문서 삭제 중 오류가 발생했습니다.");
        }
        return "redirect:/approvalList";
    }
}