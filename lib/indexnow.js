/**
 * IndexNow client. Notifies Bing, Yandex, Naver, Seznam, etc. that
 * content has changed. One POST fans out across the entire network.
 * Google does not participate in IndexNow (use Search Console).
 */

const INDEXNOW_KEY = 'c2ac0972b70a8fc490650bea7763d3ab'
const HOST = 'logangelzer.com'

export async function pingIndexNow(urls = [`https://${HOST}/`]) {
  const urlList = Array.isArray(urls) ? urls : [urls]
  if (!urlList.length) return { ok: true, skipped: true }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      // Don't let a slow ping block revalidation.
      signal: AbortSignal.timeout(5000),
    })
    return { ok: res.ok, status: res.status, urls: urlList }
  } catch (err) {
    return { ok: false, error: String(err), urls: urlList }
  }
}
