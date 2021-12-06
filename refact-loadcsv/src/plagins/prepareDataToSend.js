function preparePostJSON(data, url) {
  let sendOption = {}

  sendOption.url = url
  sendOption.options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  return sendOption
}

function prepareSendJSONbyGet(data, url) {
  let sendOption = {}
  url += '?'
  sendOption.options = {
    method: 'GET',
  }

  Object.keys(data).forEach(
    (key) => (url += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`)
  )
  sendOption.url = url
  return sendOption
}

export default function(sendMethod, url, data) {
  if (sendMethod === 'POST') {
    return preparePostJSON(data, url)
  } else if (sendMethod === 'GET') {
    return prepareSendJSONbyGet(data, url)
  }
}
