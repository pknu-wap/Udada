package com.pknuwap.udada.repository;

import com.pknuwap.udada.entity.NoticeAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeAttachmentRepository extends JpaRepository<NoticeAttachment, Long> {
}