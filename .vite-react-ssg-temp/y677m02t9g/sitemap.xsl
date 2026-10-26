<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html dir="rtl" lang="ar">
      <head>
        <title>خريطة الموقع (Sitemap) | شركة المصاعد المبتكرة</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Tajawal", Tahoma, sans-serif;
            color: #132454;
            background-color: #f8fafc;
            margin: 0;
            padding: 30px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            padding: 32px;
            border: 1px solid #e2e8f0;
          }
          header {
            border-bottom: 2px solid #336ea6;
            padding-bottom: 16px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          h1 {
            color: #132454;
            font-size: 24px;
            margin: 0 0 6px 0;
          }
          p.desc {
            color: #64748b;
            font-size: 14px;
            margin: 0;
          }
          .stats {
            background: #e6f0fa;
            color: #1b4977;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
            font-size: 13px;
          }
          th {
            background-color: #132454;
            color: #ffffff;
            text-align: right;
            padding: 12px 14px;
            font-weight: 600;
          }
          th:first-child { border-top-right-radius: 6px; }
          th:last-child { border-top-left-radius: 6px; }
          td {
            padding: 11px 14px;
            border-bottom: 1px solid #edf2f7;
            text-align: right;
            direction: ltr;
            text-align: left;
          }
          td.meta {
            direction: rtl;
            text-align: right;
          }
          tr:hover td {
            background-color: #f1f5f9;
          }
          a {
            color: #336ea6;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
            color: #132454;
          }
          .priority-tag {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 11px;
            background: #e2e8f0;
            color: #334155;
          }
          .priority-high {
            background: #dcfce7;
            color: #166534;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div>
              <h1>خريطة الموقع XML الرسمية (Sitemap)</h1>
              <p class="desc">شركة المصاعد المبتكرة | Al-Masaed Al-Mubtakirah Co.</p>
            </div>
            <div class="stats">
              إجمالي الروابط المفهرسة: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </div>
          </header>

          <table>
            <thead>
              <tr>
                <th style="width: 55%; text-align: left;">رابط الصفحة (URL)</th>
                <th style="width: 15%;">تاريخ التعديل</th>
                <th style="width: 15%;">معدل التحديث</th>
                <th style="width: 15%;">الأولوية</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="meta">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td class="meta">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="meta">
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.9">
                        <span class="priority-tag priority-high"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority-tag"><xsl:value-of select="sitemap:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
