package com.pknuwap.udada;

import com.pknuwap.udada.common.crawler.CrawledNotice;
import com.pknuwap.udada.common.crawler.PknuCrawler;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CrawlerTests {

    private PknuCrawler pknuCrawler;

    @BeforeEach
    void setUp() {
        pknuCrawler = new PknuCrawler();
    }

    // ── 테스트용 HTML 픽스처 ──────────────────────────────────────────────

    // 정상 공지사항 2건 + 고정공지(notice 클래스) 1건
    private static final String NORMAL_HTML = """
            <html><body>
            <table class="bdListTbl">
              <tbody>
                <tr class="notice">
                  <td class="bdlTitle"><a href="/main/notice/1">고정공지 - 무시되어야 함</a></td>
                  <td class="bdlDate">2026.04.01</td>
                </tr>
                <tr>
                  <td class="bdlTitle"><a href="/main/notice/2">2026년 1학기 장학금 신청 안내</a></td>
                  <td class="bdlDate">2026.05.01</td>
                </tr>
                <tr>
                  <td class="bdlTitle"><a href="https://www.pknu.ac.kr/main/notice/3">도서관 휴관 안내</a></td>
                  <td class="bdlDate">2026.04.30</td>
                </tr>
              </tbody>
            </table>
            </body></html>
            """;

    // 공지사항이 한 건도 없는 HTML
    private static final String EMPTY_HTML = """
            <html><body>
            <table class="bdListTbl">
              <tbody>
              </tbody>
            </table>
            </body></html>
            """;

    // 날짜 파싱 불가 HTML
    private static final String INVALID_DATE_HTML = """
            <html><body>
            <table class="bdListTbl">
              <tbody>
                <tr>
                  <td class="bdlTitle"><a href="/main/notice/4">날짜 없는 공지</a></td>
                  <td class="bdlDate">날짜아님</td>
                </tr>
              </tbody>
            </table>
            </body></html>
            """;

    // ── 테스트 케이스 ────────────────────────────────────────────────────

    @Nested
    @DisplayName("정상 크롤링")
    class NormalCrawl {

        @Test
        @DisplayName("성공 - 고정공지 제외하고 일반 공지만 파싱")
        void crawl_excludesNoticeClass() throws Exception {
            Document doc = Jsoup.parse(NORMAL_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                // 고정공지(notice 클래스) 제외하고 2건만 파싱
                assertThat(result).hasSize(2);
            }
        }

        @Test
        @DisplayName("성공 - 제목 정상 파싱")
        void crawl_parsesTitle() throws Exception {
            Document doc = Jsoup.parse(NORMAL_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                assertThat(result.get(0).getTitle()).isEqualTo("2026년 1학기 장학금 신청 안내");
                assertThat(result.get(1).getTitle()).isEqualTo("도서관 휴관 안내");
            }
        }

        @Test
        @DisplayName("성공 - 상대경로 URL은 BASE_URL이 붙어야 함")
        void crawl_relativeUrlPrefixedWithBaseUrl() throws Exception {
            Document doc = Jsoup.parse(NORMAL_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                assertThat(result.get(0).getOriginalUrl())
                        .isEqualTo("https://www.pknu.ac.kr/main/notice/2");
            }
        }

        @Test
        @DisplayName("성공 - 절대경로 URL은 그대로 유지")
        void crawl_absoluteUrlUnchanged() throws Exception {
            Document doc = Jsoup.parse(NORMAL_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                assertThat(result.get(1).getOriginalUrl())
                        .isEqualTo("https://www.pknu.ac.kr/main/notice/3");
            }
        }

        @Test
        @DisplayName("성공 - 날짜 정상 파싱")
        void crawl_parsesDate() throws Exception {
            Document doc = Jsoup.parse(NORMAL_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                assertThat(result.get(0).getNoticedAt().getYear()).isEqualTo(2026);
                assertThat(result.get(0).getNoticedAt().getMonthValue()).isEqualTo(5);
                assertThat(result.get(0).getNoticedAt().getDayOfMonth()).isEqualTo(1);
            }
        }
    }

    @Nested
    @DisplayName("엣지 케이스")
    class EdgeCase {

        @Test
        @DisplayName("공지사항이 없으면 빈 리스트 반환")
        void crawl_emptyList() throws Exception {
            Document doc = Jsoup.parse(EMPTY_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                assertThat(result).isEmpty();
            }
        }

        @Test
        @DisplayName("날짜 파싱 실패 시 noticedAt이 null")
        void crawl_invalidDate_noticedAtNull() throws Exception {
            Document doc = Jsoup.parse(INVALID_DATE_HTML);

            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenReturn(doc);

                List<CrawledNotice> result = pknuCrawler.crawl();

                assertThat(result).hasSize(1);
                assertThat(result.get(0).getNoticedAt()).isNull();
            }
        }
    }

    @Nested
    @DisplayName("네트워크 오류")
    class NetworkError {

        @Test
        @DisplayName("IOException 발생 시 RuntimeException으로 래핑")
        void crawl_ioException_throwsRuntimeException() throws Exception {
            try (MockedStatic<Jsoup> jsoupMock = mockStatic(Jsoup.class)) {
                var conn = mock(org.jsoup.Connection.class);
                jsoupMock.when(() -> Jsoup.connect(any())).thenReturn(conn);
                when(conn.userAgent(any())).thenReturn(conn);
                when(conn.timeout(anyInt())).thenReturn(conn);
                when(conn.get()).thenThrow(new IOException("Connection timed out"));

                assertThatThrownBy(() -> pknuCrawler.crawl())
                        .isInstanceOf(RuntimeException.class)
                        .hasMessageContaining("크롤링 중 오류가 발생했습니다.");
            }
        }
    }
}