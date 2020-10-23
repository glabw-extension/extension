/**
 * @desc 文件下载
 *
 * @export
 * @param {String} url
 * @param {string} [name='download']
 * @returns {Void}
 */
export default function(url, name = 'download') {
  let a = document.createElement('a')
  if (typeof url !== 'string') {
    a.href = window.URL.createObjectURL(url)
  } else {
    a.href = url
  }
  a.download = name
  a.click()
  window.URL.revokeObjectURL(a.href)
}
