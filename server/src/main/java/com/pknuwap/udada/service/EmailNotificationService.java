package com.pknuwap.udada.service;

import com.pknuwap.udada.entity.Notice;
import com.pknuwap.udada.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailNotificationService {

    private final JavaMailSender mailSender;

    // 유저에게 매칭된 공지 목록을 한 번에 발송
    public void sendBatch(User user, List<Notice> notices) {
        if (!user.hasEmail()) {
            log.warn("[EmailNotification] 이메일 미등록 유저 스킵 - userId: {}", user.getId());
            return;
        }

        if (notices.isEmpty()) {
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("[우다다] 새로운 공지사항 %d건이 등록되었습니다".formatted(notices.size()));
            helper.setText(buildEmailContent(notices), true);

            mailSender.send(message);
            log.info("[EmailNotification] 발송 성공 - userId: {}, 공지 수: {}", user.getId(), notices.size());

        } catch (MessagingException e) {
            log.error("[EmailNotification] 발송 실패 - userId: {}, reason: {}",
                    user.getId(), e.getMessage());
        }
    }

    private String buildEmailContent(List<Notice> notices) {
        // 공지사항 목록 HTML 생성
        String noticeListHtml = notices.stream()
                .map(notice -> """
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                                <a href="%s"
                                   style="color: #333; text-decoration: none; font-size: 14px;">
                                    %s
                                </a>
                                <span style="color: #999; font-size: 12px; margin-left: 8px;">
                                    %s
                                </span>
                            </td>
                        </tr>
                        """.formatted(
                        notice.getOriginalUrl(),
                        notice.getTitle(),
                        notice.getNoticedAt() != null ? notice.getNoticedAt().toLocalDate().toString() : ""
                ))
                .collect(Collectors.joining());

        return """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">📢 새로운 공지사항 %d건</h2>
                    <p style="color: #666;">설정하신 키워드와 관련된 공지사항이 등록되었습니다.</p>
                    <hr/>
                    <table style="width: 100%%; border-collapse: collapse;">
                        %s
                    </table>
                    <br/>
                    <p style="color: #999; font-size: 12px;">
                        본 메일은 우다다 서비스에서 발송된 자동 알림 메일입니다.
                    </p>
                </div>
                """.formatted(notices.size(), noticeListHtml);
    }
}