/**
 * 是否是标准对象
 *
 * @export
 * @param {Any} obj
 * @param {String} [type='[object Object]']
 * @returns {Boolean}
 */
export default function(obj, type = '[object Object]') {
  return obj.toString() === type
}
