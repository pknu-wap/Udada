package com.pknuwap.udada.dto.response;

import com.pknuwap.udada.entity.NoticeAttachment;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttachmentResponse {
    private Long id;
    private String fileName;
    private String fileUrl;
    private String fileType;

    public static AttachmentResponse from(NoticeAttachment attachment) {
        return AttachmentResponse.builder()
                .id(attachment.getId())
                .fileName(attachment.getFileName())
                .fileUrl(attachment.getFileUrl())
                .fileType(attachment.getFileType())
                .build();
    }
}