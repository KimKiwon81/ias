package com.korigin.tobe.ias.service;

import com.korigin.tobe.ias.dto.ApprovalDocDTO;
import com.korigin.tobe.ias.dto.ApprovalSearchDTO; // ApprovalSearchDTO 임포트
import com.korigin.tobe.ias.dto.UserDTO;
import com.korigin.tobe.ias.mapper.ApprovalMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ApprovalService {

    private final ApprovalMapper approvalMapper;

    @Value("${app.upload.root-path}")
    private String uploadRootPath;

    @Value("${app.upload.resource-handler}")
    private String resourceHandler;

    public ApprovalService(ApprovalMapper approvalMapper) {
        this.approvalMapper = approvalMapper;
    }

    @Transactional
    public void registerApprovalDoc(ApprovalDocDTO approvalDoc) throws IOException {
        UserDTO requester = approvalMapper.selectUserByUserId(approvalDoc.getReqUserId());
        if (requester == null) {
            throw new IllegalArgumentException("신청자 정보를 찾을 수 없습니다: " + approvalDoc.getReqUserId());
        }
        approvalDoc.setReqUserNm(requester.getUsrName());
        approvalDoc.setReqDeptId(requester.getDeptCd());

        MultipartFile attachment = approvalDoc.getAttachment();
        if (attachment != null && !attachment.isEmpty()) {
            String storedFilePath = uploadFile(attachment);
            approvalDoc.setAtchFilePath(storedFilePath);
        }

        if (approvalDoc.getDocStatCd() == null || approvalDoc.getDocStatCd().isEmpty()) {
            approvalDoc.setDocStatCd("10"); // 대기
        }

        approvalMapper.insertApprovalDoc(approvalDoc);
    }

    private String uploadFile(MultipartFile file) throws IOException {
        String todayFolder = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        Path uploadDirPath = Paths.get(uploadRootPath, todayFolder);
        if (!Files.exists(uploadDirPath)) {
            Files.createDirectories(uploadDirPath);
        }

        String originalFilename = Optional.ofNullable(file.getOriginalFilename()).orElse("unnamed");
        String fileExtension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFilename.substring(dotIndex);
        }
        String storedFileName = UUID.randomUUID().toString() + fileExtension;

        Path targetLocation = uploadDirPath.resolve(storedFileName);
        Files.copy(file.getInputStream(), targetLocation);

        String baseResourcePath = resourceHandler.replace("/**", "");
        return baseResourcePath + "/" + todayFolder + "/" + storedFileName;
    }

    // [수정] 결재 문서 목록 조회 (검색 조건 추가)
    @Transactional(readOnly = true)
    public List<ApprovalDocDTO> getApprovalDocList(ApprovalSearchDTO searchDTO) {
        return approvalMapper.selectApprovalDocList(searchDTO);
    }

     // [추가] 결재 문서 삭제 (소프트 삭제)
    @Transactional
     public void deleteApprovalDoc(String approvDocId, String currentUserId) { // <- 여기에 'String currentUserId'가 없었다면 추가해주세요!
        // 1. 해당 결재 문서의 신청자 ID를 조회
        String requesterId = approvalMapper.selectRequesterIdByDocId(approvDocId);

        // 2. 문서 존재 여부 및 권한 검증
        if (requesterId == null) {
            throw new IllegalArgumentException("삭제할 결재 문서를 찾을 수 없거나 이미 삭제되었습니다: " + approvDocId);
        }
        if (!requesterId.equals(currentUserId)) {
            // 이 예외는 Controller의 SecurityException 캐치 블록에서 잡힐 것입니다.
            throw new SecurityException("자신이 신청한 결재 문서만 삭제할 수 있습니다. (문서 ID: " + approvDocId + ", 신청자: " + requesterId + ")");
        }

        // 3. 소프트 삭제 수행
        int updatedRows = approvalMapper.deleteApprovalDoc(approvDocId);
        if (updatedRows == 0) {
            // 이 경우는 위에서 requesterId가 null이 아닌 경우이므로, 삭제 실패는 로직 오류 또는 동시성 문제일 수 있습니다.
            throw new RuntimeException("결재 문서 삭제 처리 중 알 수 없는 오류가 발생했습니다: " + approvDocId);
        }
    }
}
