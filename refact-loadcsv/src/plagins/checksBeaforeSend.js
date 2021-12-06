const URL_CHECK = /^HTTP|HTTPS|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/
const ONE_USE_HTTP_CHECK = /http[s]?:\/\//gim

function chURLFormat(url) {
  if (!URL_CHECK.test(url)) {
    return {
      state: false,
      msg: 'invalid URL',
    }
  } else if (url.match(ONE_USE_HTTP_CHECK).length > 1) {
    return {
      state: false,
      msg: 'IN URL (http[s]://) repeats twice or more times',
    }
  } else {
    return {
      state: true,
      msg: 'ok',
    }
  }
}

function chArrContainsData(data) {
  if (data.length === 0) {
    return {
      state: false,
      msg: "Arr doesn't contain data",
    }
  } else {
    return {
      state: true,
      msg: 'ok',
    }
  }
}

export { chURLFormat, chArrContainsData }
