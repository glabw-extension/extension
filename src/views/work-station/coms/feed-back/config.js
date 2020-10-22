export const DEFAULT_UPLOAD_CONFIG = {
  style: 'width: 100%',
  action: '/api/webfile/bi_file/upload?params={"client_name":"local"}',
  accept: '.png, .jpg, .jpeg',
  limit: 3,
  multiple: true,
}
export const TIPS = '只能上传 jpg/png 文件，且不超过500kb，最多上传三张图片'

export const COMMON_QUESTION_OPERATE = [
  {
    label: '反馈问题',
    cb: vm =>
      vm.$router.push({
        name: 'feedback',
      }),
  },
]

export function formatQuestionContent(contents) {
  return contents.map(item => ({
    ...item,
    desc: item.content,
  }))
}
