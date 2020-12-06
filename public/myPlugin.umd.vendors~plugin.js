((typeof self !== 'undefined' ? self : this)["webpackJsonpmyPlugin"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpmyPlugin"] || []).push([[5],{

/***/ "0b25":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "0d3b":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "145e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "170b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");
var speciesConstructor = __webpack_require__("4840");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ "182d":
/***/ (function(module, exports, __webpack_require__) {

var toPositiveInteger = __webpack_require__("f8cd");

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "219c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  return $sort.call(aTypedArray(this), comparefn);
});


/***/ }),

/***/ "25a1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduceRight = __webpack_require__("d58f").right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "2954":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var speciesConstructor = __webpack_require__("4840");
var fails = __webpack_require__("d039");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ "2b3d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("3ca3");
var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var global = __webpack_require__("da84");
var defineProperties = __webpack_require__("37e8");
var redefine = __webpack_require__("6eeb");
var anInstance = __webpack_require__("19aa");
var has = __webpack_require__("5135");
var assign = __webpack_require__("60da");
var arrayFrom = __webpack_require__("4df4");
var codeAt = __webpack_require__("6547").codeAt;
var toASCII = __webpack_require__("5fb2");
var setToStringTag = __webpack_require__("d44e");
var URLSearchParamsModule = __webpack_require__("9861");
var InternalStateModule = __webpack_require__("69f3");

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "3280":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $lastIndexOf = __webpack_require__("e58c");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ "3a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $findIndex = __webpack_require__("b727").findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "3c5d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var toLength = __webpack_require__("50c4");
var toOffset = __webpack_require__("182d");
var toObject = __webpack_require__("7b0b");
var fails = __webpack_require__("d039");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),

/***/ "3fcc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $map = __webpack_require__("b727").map;
var speciesConstructor = __webpack_require__("4840");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
  });
});


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a0c":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=this.$L||D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v});


/***/ }),

/***/ "5cc6":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "5f96":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('join', function join(separator) {
  return $join.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ "5fb2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),

/***/ "60bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayIterators = __webpack_require__("e260");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "621a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefineAll = __webpack_require__("e2cc");
var fails = __webpack_require__("d039");
var anInstance = __webpack_require__("19aa");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var IEEE754 = __webpack_require__("77a7");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var defineProperty = __webpack_require__("9bf2").f;
var arrayFill = __webpack_require__("81d5");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ "649e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $some = __webpack_require__("b727").some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "72f7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var exportTypedArrayMethod = __webpack_require__("ebb5").exportTypedArrayMethod;
var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),

/***/ "735e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $fill = __webpack_require__("81d5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ "74e8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__("8aa7");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayBufferModule = __webpack_require__("621a");
var anInstance = __webpack_require__("19aa");
var createPropertyDescriptor = __webpack_require__("5c6c");
var createNonEnumerableProperty = __webpack_require__("9112");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var toOffset = __webpack_require__("182d");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var classof = __webpack_require__("f5df");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var typedArrayFrom = __webpack_require__("a078");
var forEach = __webpack_require__("b727").forEach;
var setSpecies = __webpack_require__("2626");
var definePropertyModule = __webpack_require__("9bf2");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var InternalStateModule = __webpack_require__("69f3");
var inheritIfRequired = __webpack_require__("7156");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "77a7":
/***/ (function(module, exports) {

// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ "81d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "82f8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $includes = __webpack_require__("4d64").includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "8aa7":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new */
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__("ebb5").NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ "9861":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("e260");
var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var createIteratorConstructor = __webpack_require__("9ed3");
var InternalStateModule = __webpack_require__("69f3");
var anInstance = __webpack_require__("19aa");
var hasOwn = __webpack_require__("5135");
var bind = __webpack_require__("0366");
var classof = __webpack_require__("f5df");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var wellKnownSymbol = __webpack_require__("b622");

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var getIteratorMethod = __webpack_require__("35a1");

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ "9a8c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $copyWithin = __webpack_require__("145e");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ "a078":
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var getIteratorMethod = __webpack_require__("35a1");
var isArrayIteratorMethod = __webpack_require__("e95a");
var bind = __webpack_require__("0366");
var aTypedArrayConstructor = __webpack_require__("ebb5").aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ "a623":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $every = __webpack_require__("b727").every;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('every');
var USES_TO_LENGTH = arrayMethodUsesToLength('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "a79d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var NativePromise = __webpack_require__("fea9");
var fails = __webpack_require__("d039");
var getBuiltIn = __webpack_require__("d066");
var speciesConstructor = __webpack_require__("4840");
var promiseResolve = __webpack_require__("cdf9");
var redefine = __webpack_require__("6eeb");

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// patch native Promise.prototype for native async functions
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}


/***/ }),

/***/ "a975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $every = __webpack_require__("b727").every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "a981":
/***/ (function(module, exports) {

module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var fails = __webpack_require__("d039");

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);


/***/ }),

/***/ "c1ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $filter = __webpack_require__("b727").filter;
var speciesConstructor = __webpack_require__("4840");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});


/***/ }),

/***/ "ca91":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduce = __webpack_require__("d58f").left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "cd26":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ "d139":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $find = __webpack_require__("b727").find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d58f":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");
var toLength = __webpack_require__("50c4");

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "d5d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $forEach = __webpack_require__("b727").forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "e301":
/***/ (function(module, exports, __webpack_require__) {

!function(A,e){ true?module.exports=e():undefined}(window,function(){return function(A){var e={};function t(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return A[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=A,t.c=e,t.d=function(A,e,r){t.o(A,e)||Object.defineProperty(A,e,{enumerable:!0,get:r})},t.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},t.t=function(A,e){if(1&e&&(A=t(A)),8&e)return A;if(4&e&&"object"==typeof A&&A&&A.__esModule)return A;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:A}),2&e&&"string"!=typeof A)for(var n in A)t.d(r,n,function(e){return A[e]}.bind(null,n));return r},t.n=function(A){var e=A&&A.__esModule?function(){return A.default}:function(){return A};return t.d(e,"a",e),e},t.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},t.p="./",t(t.s=11)}([function(A,e,t){"use strict";function r(A,e){return A.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))}Object.defineProperty(e,"__esModule",{value:!0}),e.css=function(A,e){for(var t in e)A.style[t]=e[t]},e.remove=function(A){A instanceof HTMLElement?A.parentNode.removeChild(A):A instanceof HTMLCollection&&Array.prototype.forEach.call(A,function(A){A.parentNode.removeChild(A)})},e.domType=function(A){return Object.prototype.toString.call(A)},e.hasClass=r,e.addClass=function(A,e){r(A,e)||(A.className+=" "+e)},e.removeClass=function(A,e){if(r(A,e)){var t=new RegExp("(\\s|^)"+e+"(\\s|$)");A.className=A.className.replace(t," ")}},e.computed=function(A,e,t,r){Object.defineProperty(A,e,{set:function(e){t.forEach(function(n,o){r[o](A,e,t[o])})}})},e.typeChecking=function(A){return Object.prototype.toString.call(A)}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.getElementsByClassName("kssToolbarItemBT");Array.prototype.forEach.call(e,function(A){(0,r.removeClass)(A,"kssToolbarActiveItemBT")}),A?((0,r.addClass)(A,"kssToolbarActiveItemBT"),document.getElementById("kssRectangleCanvas").style.cursor="crosshair"):document.getElementById("kssRectangleCanvas").style.cursor="move"};var r=t(0)},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A,e){"textLayer"===e?((0,r.css)(A.kssTextLayer,{"z-index":99}),(0,r.css)(A.rectangleCanvas,{"z-index":98})):"canvasLayer"===e&&((0,r.css)(A.rectangleCanvas,{"z-index":99}),(0,r.css)(A.kssTextLayer,{"z-index":98}))};var r=t(0)},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){A.rectangleCanvas.getContext("2d").drawImage(A.rectangleCanvas,0,0,A.width*A.scale,A.height*A.scale,0,0,A.width*A.scale,A.height*A.scale);var e=A.rectangleCanvas.toDataURL("image/png");A.snapshootList.push(e),A.currentImgDom.src=e}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){A.rectangleCanvas.width=A.width*A.scale,A.rectangleCanvas.height=A.height*A.scale,A.rectangleCanvas.getContext("2d").drawImage(A.kss,A.startX*A.scale,(A.startY+A.scrollTop)*A.scale,A.width*A.scale,A.height*A.scale,0,0,A.width*A.scale,A.height*A.scale);var e=A.rectangleCanvas.toDataURL("image/png");A.imgBase64=e,A.snapshootList[0]=e,A.currentImgDom.src=A.imgBase64}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){A.rectangleCanvas.getContext("2d").drawImage(A.currentImgDom,0,0,A.width*A.scale,A.height*A.scale,0,0,A.width*A.scale,A.height*A.scale)}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A,e,t,n,o,s){var a=document.documentElement.clientHeight,i=A.toolbarWidth-e-o;i>0?(0,r.css)(s,{right:"-"+i+"px"}):(0,r.css)(s,{right:"0px"});a-n-t-A.toolbarMarginTop-A.toolbarHeight<0?n>=35?(0,r.css)(s,{top:"-"+(A.toolbarHeight+A.toolbarMarginTop)+"px"}):(0,r.css)(s,{top:A.toolbarMarginTop+"px"}):(0,r.css)(s,{top:t+A.toolbarMarginTop+"px"})};var r=t(0)},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){(0,r.removeClass)(document.body,"kssBody"),A.kss&&(0,r.remove)(A.kss),A.kssScreenShotWrapper&&(0,r.remove)(A.kssScreenShotWrapper),A.style&&(0,r.remove)(A.style),A.kss=null,A.rectangleCanvas=null,A.kssTextLayer=null,A.kssScreenShotWrapper=null,A.drawingStatus=null,A.toolbar=null,A.currentToolType=null,A.snapshootList=[],A.isScreenshot=!1,A.isEdit=!1,A.toolmousedown=null,A.toolmousemove=null,A.toolmouseup=null,document.removeEventListener("keydown",A.endScreenShot),setTimeout(function(){document.removeEventListener("contextmenu",A.preventContextMenu)},0),document.removeEventListener("keydown",A.endScreenShot),document.removeEventListener("mouseup",A.cancelDrawingStatus)};var r=t(0)},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){A.rectangleCanvas.width=A.width*A.scale,A.rectangleCanvas.height=A.height*A.scale,A.rectangleCanvas.getContext("2d").clearRect(0,0,A.width,A.height)}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.documentElement.clientHeight,t=document.documentElement.clientWidth,r=A.clientX,n=A.clientY;r<0&&(r=0);r>t&&(r=t);n<0&&(n=0);n>e&&(n=e);return[r,n]}},function(A,e){A.exports="data:image/x-icon;base64,AAABAAQAICAAAAEACACoCAAARgAAABAQAAABAAgAaAUAAO4IAAAgIAAAAQAgAKgQAABWDgAAEBAAAAEAIABoBAAA/h4AACgAAAAgAAAAQAAAAAEACAAAAAAAAAQAAAAAAAAAAAAAAAEAAAABAAAAAAAAAFX/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wEBAQH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8BAf//AQH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wEB//8BAf8AAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD/AQH//wEB/wAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/AP8BAf//AQH/AAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD//wEB//8BAf8AAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////////////////////////////////////////////////////////////////////////////////8P///+B////AP///wD///MA///xAP//8AD///AB///wB///8A////Af///wP///8H////D////x////8/////KAAAABAAAAAgAAAAAQAIAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAEAAAAAAAAAVf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAAD/////AAAAAAAAAAAAAAD/AQEBAf8AAAAAAAAAAAD/AQH//wEB/wAAAAAAAAAA/wEB//8BAf8AAAAA//8AAP8BAf//AQH/AAAAAP8A/wD/AQH//wEB/wAAAAD/AAD//wEB//8BAf8AAAAA/wAAAP////////8AAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAA/wAAAAAAAAAA/wAAAAAA/wAAAAAAAAAAAP8AAAAA/wAAAAAAAAAAAAD/AAAA/wAAAAAAAAAAAAAA/wAA/wAAAAAAAAAAAAAAAP8A/wAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAA/D8AAPgfAADwDwAA8A8AADAPAAAQDwAAAA8AAAAfAAAAfwAAAP8AAAH/AAAD/wAAB/8AAA//AAAf/wAAP/8AACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AFX//wBV//8AVf//AFX///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wBV//8AVf////////////8AVf//AFX///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AFX//wBV/////////////wBV//8AVf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAP////8AVf//AFX/////////////AFX//wBV////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA//////8AAAAA/////wBV//8AVf////////////8AVf//AFX///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAD/AAAA////////////AFX//wBV/////////////wBV//8AVf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAP8AAAD/AAAA//////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAP8AAAD/AAAA/wAAAP8AAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA/wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAD/AAAA/wAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAP8AAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////w////4H///8A////AP//8wD///EA///wAP//8AH///AH///wD///8B////A////wf///8P////H////z////8oAAAAEAAAACAAAAABACAAAAAAAEAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wBV//8AVf//AFX//wBV////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wBV//8AVf////////////8AVf//AFX///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AVf//AFX/////////////AFX//wBV////////AAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAD/////AFX//wBV/////////////wBV//8AVf///////wAAAAAAAAAAAAAAAAAAAAD/////AAAA//////8AAAAA/////wBV//8AVf////////////8AVf//AFX///////8AAAAAAAAAAAAAAAAAAAAA/////wAAAP8AAAD///////////8AVf//AFX/////////////AFX//wBV////////AAAAAAAAAAAAAAAAAAAAAP////8AAAD/AAAA/wAAAP//////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAD/AAAA/wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA/wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAP8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAD/AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPw/AAD4HwAA8A8AAPAPAAAwDwAAEA8AAAAPAAAAHwAAAH8AAAD/AAAB/wAAA/8AAAf/AAAP/wAAH/8AAD//AAA="},function(A,e,t){A.exports=t(12)},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=u(t(13)),n=t(0),o=u(t(15)),s=u(t(16)),a=u(t(4)),i=u(t(8)),B=u(t(7)),l=u(t(9)),c=u(t(6));u(t(10));function u(A){return A&&A.__esModule?A:{default:A}}t(40);var d=function(){var A=void 0,e=function(e){var t=this;return A||(this.kss=null,this.style=null,this.kssScreenShotWrapper=null,this.kssTextLayer=null,this.rectangleCanvas=null,this.toolbar=null,this.scale=window.devicePixelRatio||1,this.currentImgDom=null,this.isScreenshot=!1,this.snapshootList=[],this.drawingStatus=null,this.currentToolType=null,this.imgBase64=null,this.isEdit=!1,this.startX=null,this.startY=null,this.width=null,this.height=null,this.dotSize=6,this.lineSize=2,this.toolShow=e.toolShow,this.toolbarWidth=null,this.toolbarHeight=30,this.toolbarMarginTop=5,this.toolbarColor="#fb3838",this.toolbarLineWidth="[object Object]"===(0,n.typeChecking)(e.toolShow)?function(A){return isNaN(A)?10:A>10?10:A<1?1:A}(e.toolShow.drawLine):10,this.toolmousedown=null,this.toolmousemove=null,this.toolmouseup=null,this.copyPath=e.copyPath,this.needDownload=e.needDownload,this.endCB=e.endCB,this.cancelCB=e.cancelCB,this.startDrawDown=function(A){var e=t;if(document.addEventListener("mouseup",e.cancelDrawingStatus),document.addEventListener("contextmenu",e.preventContextMenu),0===A.button&&null===e.drawingStatus){e.drawingStatus=1,e.startX=A.clientX,e.startY=A.clientY,(0,n.remove)(document.getElementById("kssScreenShotWrapper"));var r=document.createElement("div");r.id="kssScreenShotWrapper",e.kssScreenShotWrapper=r;var o=document.createElement("div");o.id="kssTextLayer",e.kssTextLayer=o,r.appendChild(o),document.body.appendChild(r),document.addEventListener("mousemove",e.drawing),document.addEventListener("mouseup",e.endDraw)}},this.drawing=function(A){var e=t;e.drawingStatus=2;var r=(0,l.default)(A),o=r[0],s=r[1];(0,n.css)(e.kssScreenShotWrapper,{height:Math.abs(s-e.startY)+"px",width:Math.abs(o-e.startX)+"px",top:Math.min(e.startY,s)+"px",left:Math.min(e.startX,o)+"px"})},this.endDraw=function(A){if(0===A.button){var e=t;if(e.drawingStatus=3,e.startX===A.clientX&&e.startY===A.clientY){var r=document.documentElement.clientHeight,B=document.documentElement.clientWidth;e.startX=2,e.startY=2,e.height=r-4,e.width=B-4,(0,n.css)(e.kssScreenShotWrapper,{height:e.height+"px",width:e.width+"px",top:e.startY+"px",left:e.startX+"px"})}else{var u=(0,l.default)(A),d=u[0],w=u[1];e.width=Math.abs(d-e.startX),e.height=Math.abs(w-e.startY),e.startX=Math.min(e.startX,d),e.startY=Math.min(e.startY,w)}document.removeEventListener("mousemove",e.drawing);var Q=document.createElement("canvas");Q.id="kssRectangleCanvas",e.kssScreenShotWrapper.appendChild(Q),e.rectangleCanvas=Q,Q.addEventListener("mousedown",function(A){if(!e.isEdit&&2!==A.button){(0,i.default)(e);var t=A.clientX,r=A.clientY;document.addEventListener("mousemove",B),document.addEventListener("mouseup",function A(t){void 0===o&&(o=e.startY);void 0===s&&(s=e.startX);e.startY=o;e.startX=s;document.removeEventListener("mousemove",B);document.removeEventListener("mouseup",A);(0,a.default)(e)});var o=void 0,s=void 0}function B(A){var a=document.documentElement.clientHeight,i=document.documentElement.clientWidth;o=e.startY+A.clientY-r,e.startY+A.clientY-r+e.height>a&&(o=a-e.height),e.startY+A.clientY-r<0&&(o=0),s=e.startX+A.clientX-t,e.startX+A.clientX-t+e.width>i&&(s=i-e.width),e.startX+A.clientX-t<0&&(s=0),(0,n.css)(e.kssScreenShotWrapper,{top:o+"px",left:s+"px"}),(0,c.default)(e,e.width,e.height,o,s,e.toolbar)}}),e.kss.removeEventListener("mousedown",e.startDrawDown),document.removeEventListener("mouseup",e.endDraw),(0,o.default)(e.kssScreenShotWrapper,e.dotSize,e.lineSize,e);var g=document.createElement("img");g.id="kssCurrentImgDom",e.kssScreenShotWrapper.appendChild(g),e.currentImgDom=g,(0,a.default)(e),e.toolbar=(0,s.default)(e)}},this.preventContextMenu=function(A){A.preventDefault()},this.cancelDrawingStatus=function(A){var e=t;if(2===A.button){if(null===e.drawingStatus)return document.removeEventListener("mouseup",e.cancelDrawingStatus),setTimeout(function(){document.removeEventListener("contextmenu",e.preventContextMenu)},0),(0,B.default)(e),void e.cancelCB();(0,n.remove)(e.kssScreenShotWrapper),e.kssScreenShotWrapper=null,e.kssTextLayer=null,e.rectangleCanvas=null,e.drawingStatus=null,e.isEdit=!1,e.snapshootList=[],e.currentToolType=null,e.toolmousedown=null,e.toolmousemove=null,e.toolmouseup=null,e.kss.addEventListener("mousedown",e.startDrawDown)}},this.startScreenShot=function(){t.start()},this.endScreenShot=function(){(0,B.default)(t)},this.init(e.key,e.immediately),A=this)};return e.prototype.init=function(A,e){var t=this;if(!0===e&&(t.start(),t.end()),void 0===A)A=65;else if(null===A)return;document.addEventListener("keydown",function(A,e){e.keyCode===A&&e.shiftKey&&!t.isScreenshot&&(t.start(),t.end())}.bind(null,A))},e.prototype.start=function(){var A=this;A.isScreenshot||(A.isScreenshot=!0,(0,r.default)(document.body,{useCORS:!0,scrollY:200}).then(function(e){A.kss=e,A.scrollTop=document.documentElement.scrollTop,e.id="kss",document.body.appendChild(e),(0,n.addClass)(document.body,"kssBody"),(0,n.css)(e,{top:"-"+A.scrollTop+"px"}),e.addEventListener("mousedown",A.startDrawDown)}))},e.prototype.end=function(){var A=this;A.endScreenShot=function(e){27===e.keyCode&&((0,B.default)(A),A.cancelCB())},document.addEventListener("keydown",A.endScreenShot)},e}();e.default=d},function(A,e,t){"use strict";(function(A){var t,r,n,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&"function"==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?"symbol":typeof A};!function(s,a){"object"==o(e)&&"object"==o(A)?A.exports=a():(r=[],void 0===(n="function"==typeof(t=a)?t.apply(e,r):t)||(A.exports=n))}(0,function(){return function(A){var e={};function t(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return A[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=A,t.c=e,t.d=function(A,e,r){t.o(A,e)||Object.defineProperty(A,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(A){var e=A&&A.__esModule?function(){return A.default}:function(){return A};return t.d(e,"a",e),e},t.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},t.p="",t(t.s=27)}([function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),o=/^#([a-f0-9]{3})$/i,s=function(A){var e=A.match(o);return!!e&&[parseInt(e[1][0]+e[1][0],16),parseInt(e[1][1]+e[1][1],16),parseInt(e[1][2]+e[1][2],16),null]},a=/^#([a-f0-9]{6})$/i,i=function(A){var e=A.match(a);return!!e&&[parseInt(e[1].substring(0,2),16),parseInt(e[1].substring(2,4),16),parseInt(e[1].substring(4,6),16),null]},B=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,l=function(A){var e=A.match(B);return!!e&&[Number(e[1]),Number(e[2]),Number(e[3]),null]},c=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/,u=function(A){var e=A.match(c);return!!(e&&e.length>4)&&[Number(e[1]),Number(e[2]),Number(e[3]),Number(e[4])]},d=function(A){return[Math.min(A[0],255),Math.min(A[1],255),Math.min(A[2],255),A.length>3?A[3]:null]},w=function(A){return g[A.toLowerCase()]||!1},Q=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A);var t=Array.isArray(e)?d(e):s(e)||l(e)||u(e)||w(e)||i(e)||[0,0,0,null],n=r(t,4),o=n[0],a=n[1],B=n[2],c=n[3];this.r=o,this.g=a,this.b=B,this.a=c}return n(A,[{key:"isTransparent",value:function(){return 0===this.a}},{key:"toString",value:function(){return null!==this.a&&1!==this.a?"rgba("+this.r+","+this.g+","+this.b+","+this.a+")":"rgb("+this.r+","+this.g+","+this.b+")"}}]),A}();e.default=Q;var g={transparent:[0,0,0,0],aliceblue:[240,248,255,null],antiquewhite:[250,235,215,null],aqua:[0,255,255,null],aquamarine:[127,255,212,null],azure:[240,255,255,null],beige:[245,245,220,null],bisque:[255,228,196,null],black:[0,0,0,null],blanchedalmond:[255,235,205,null],blue:[0,0,255,null],blueviolet:[138,43,226,null],brown:[165,42,42,null],burlywood:[222,184,135,null],cadetblue:[95,158,160,null],chartreuse:[127,255,0,null],chocolate:[210,105,30,null],coral:[255,127,80,null],cornflowerblue:[100,149,237,null],cornsilk:[255,248,220,null],crimson:[220,20,60,null],cyan:[0,255,255,null],darkblue:[0,0,139,null],darkcyan:[0,139,139,null],darkgoldenrod:[184,134,11,null],darkgray:[169,169,169,null],darkgreen:[0,100,0,null],darkgrey:[169,169,169,null],darkkhaki:[189,183,107,null],darkmagenta:[139,0,139,null],darkolivegreen:[85,107,47,null],darkorange:[255,140,0,null],darkorchid:[153,50,204,null],darkred:[139,0,0,null],darksalmon:[233,150,122,null],darkseagreen:[143,188,143,null],darkslateblue:[72,61,139,null],darkslategray:[47,79,79,null],darkslategrey:[47,79,79,null],darkturquoise:[0,206,209,null],darkviolet:[148,0,211,null],deeppink:[255,20,147,null],deepskyblue:[0,191,255,null],dimgray:[105,105,105,null],dimgrey:[105,105,105,null],dodgerblue:[30,144,255,null],firebrick:[178,34,34,null],floralwhite:[255,250,240,null],forestgreen:[34,139,34,null],fuchsia:[255,0,255,null],gainsboro:[220,220,220,null],ghostwhite:[248,248,255,null],gold:[255,215,0,null],goldenrod:[218,165,32,null],gray:[128,128,128,null],green:[0,128,0,null],greenyellow:[173,255,47,null],grey:[128,128,128,null],honeydew:[240,255,240,null],hotpink:[255,105,180,null],indianred:[205,92,92,null],indigo:[75,0,130,null],ivory:[255,255,240,null],khaki:[240,230,140,null],lavender:[230,230,250,null],lavenderblush:[255,240,245,null],lawngreen:[124,252,0,null],lemonchiffon:[255,250,205,null],lightblue:[173,216,230,null],lightcoral:[240,128,128,null],lightcyan:[224,255,255,null],lightgoldenrodyellow:[250,250,210,null],lightgray:[211,211,211,null],lightgreen:[144,238,144,null],lightgrey:[211,211,211,null],lightpink:[255,182,193,null],lightsalmon:[255,160,122,null],lightseagreen:[32,178,170,null],lightskyblue:[135,206,250,null],lightslategray:[119,136,153,null],lightslategrey:[119,136,153,null],lightsteelblue:[176,196,222,null],lightyellow:[255,255,224,null],lime:[0,255,0,null],limegreen:[50,205,50,null],linen:[250,240,230,null],magenta:[255,0,255,null],maroon:[128,0,0,null],mediumaquamarine:[102,205,170,null],mediumblue:[0,0,205,null],mediumorchid:[186,85,211,null],mediumpurple:[147,112,219,null],mediumseagreen:[60,179,113,null],mediumslateblue:[123,104,238,null],mediumspringgreen:[0,250,154,null],mediumturquoise:[72,209,204,null],mediumvioletred:[199,21,133,null],midnightblue:[25,25,112,null],mintcream:[245,255,250,null],mistyrose:[255,228,225,null],moccasin:[255,228,181,null],navajowhite:[255,222,173,null],navy:[0,0,128,null],oldlace:[253,245,230,null],olive:[128,128,0,null],olivedrab:[107,142,35,null],orange:[255,165,0,null],orangered:[255,69,0,null],orchid:[218,112,214,null],palegoldenrod:[238,232,170,null],palegreen:[152,251,152,null],paleturquoise:[175,238,238,null],palevioletred:[219,112,147,null],papayawhip:[255,239,213,null],peachpuff:[255,218,185,null],peru:[205,133,63,null],pink:[255,192,203,null],plum:[221,160,221,null],powderblue:[176,224,230,null],purple:[128,0,128,null],rebeccapurple:[102,51,153,null],red:[255,0,0,null],rosybrown:[188,143,143,null],royalblue:[65,105,225,null],saddlebrown:[139,69,19,null],salmon:[250,128,114,null],sandybrown:[244,164,96,null],seagreen:[46,139,87,null],seashell:[255,245,238,null],sienna:[160,82,45,null],silver:[192,192,192,null],skyblue:[135,206,235,null],slateblue:[106,90,205,null],slategray:[112,128,144,null],slategrey:[112,128,144,null],snow:[255,250,250,null],springgreen:[0,255,127,null],steelblue:[70,130,180,null],tan:[210,180,140,null],teal:[0,128,128,null],thistle:[216,191,216,null],tomato:[255,99,71,null],turquoise:[64,224,208,null],violet:[238,130,238,null],wheat:[245,222,179,null],white:[255,255,255,null],whitesmoke:[245,245,245,null],yellow:[255,255,0,null],yellowgreen:[154,205,50,null]};e.TRANSPARENT=new Q([0,0,0,0])},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.calculateLengthFromValueWithUnit=e.LENGTH_TYPE=void 0;var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}();(r=t(3))&&r.__esModule;var o=e.LENGTH_TYPE={PX:0,PERCENTAGE:1},s=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type="%"===e.substr(e.length-1)?o.PERCENTAGE:o.PX;var t=parseFloat(e);this.value=isNaN(t)?0:t}return n(A,[{key:"isPercentage",value:function(){return this.type===o.PERCENTAGE}},{key:"getAbsoluteValue",value:function(A){return this.isPercentage()?A*(this.value/100):this.value}}],[{key:"create",value:function(e){return new A(e)}}]),A}();e.default=s,e.calculateLengthFromValueWithUnit=function(A,e,t){switch(t){case"px":case"%":return new s(e+t);case"em":case"rem":var r=new s(e);return r.value*="em"===t?parseFloat(A.style.font.fontSize):function A(e){var t=e.parent;return t?A(t):parseFloat(e.style.font.fontSize)}(A),r;default:return new s("0")}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseBoundCurves=e.calculatePaddingBoxPath=e.calculateBorderBoxPath=e.parsePathForBorder=e.parseDocumentSize=e.calculateContentBox=e.calculatePaddingBox=e.parseBounds=e.Bounds=void 0;var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=s(t(7)),o=s(t(32));function s(A){return A&&A.__esModule?A:{default:A}}var a=e.Bounds=function(){function A(e,t,r,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.left=e,this.top=t,this.width=r,this.height=n}return r(A,null,[{key:"fromClientRect",value:function(e,t,r){return new A(e.left+t,e.top+r,e.width,e.height)}}]),A}(),i=(e.parseBounds=function(A,e,t){return a.fromClientRect(A.getBoundingClientRect(),e,t)},e.calculatePaddingBox=function(A,e){return new a(A.left+e[3].borderWidth,A.top+e[0].borderWidth,A.width-(e[1].borderWidth+e[3].borderWidth),A.height-(e[0].borderWidth+e[2].borderWidth))},e.calculateContentBox=function(A,e,t){var r=e[0].value,n=e[1].value,o=e[2].value,s=e[3].value;return new a(A.left+s+t[3].borderWidth,A.top+r+t[0].borderWidth,A.width-(t[1].borderWidth+t[3].borderWidth+s+n),A.height-(t[0].borderWidth+t[2].borderWidth+r+o))},e.parseDocumentSize=function(A){var e=A.body,t=A.documentElement;if(!e||!t)throw new Error("");var r=Math.max(Math.max(e.scrollWidth,t.scrollWidth),Math.max(e.offsetWidth,t.offsetWidth),Math.max(e.clientWidth,t.clientWidth)),n=Math.max(Math.max(e.scrollHeight,t.scrollHeight),Math.max(e.offsetHeight,t.offsetHeight),Math.max(e.clientHeight,t.clientHeight));return new a(0,0,r,n)},e.parsePathForBorder=function(A,e){switch(e){case 0:return i(A.topLeftOuter,A.topLeftInner,A.topRightOuter,A.topRightInner);case 1:return i(A.topRightOuter,A.topRightInner,A.bottomRightOuter,A.bottomRightInner);case 2:return i(A.bottomRightOuter,A.bottomRightInner,A.bottomLeftOuter,A.bottomLeftInner);case 3:default:return i(A.bottomLeftOuter,A.bottomLeftInner,A.topLeftOuter,A.topLeftInner)}},function(A,e,t,r){var n=[];return A instanceof o.default?n.push(A.subdivide(.5,!1)):n.push(A),t instanceof o.default?n.push(t.subdivide(.5,!0)):n.push(t),r instanceof o.default?n.push(r.subdivide(.5,!0).reverse()):n.push(r),e instanceof o.default?n.push(e.subdivide(.5,!1).reverse()):n.push(e),n}),B=(e.calculateBorderBoxPath=function(A){return[A.topLeftOuter,A.topRightOuter,A.bottomRightOuter,A.bottomLeftOuter]},e.calculatePaddingBoxPath=function(A){return[A.topLeftInner,A.topRightInner,A.bottomRightInner,A.bottomLeftInner]},e.parseBoundCurves=function(A,e,t){var r=t[B.TOP_LEFT][0].getAbsoluteValue(A.width),o=t[B.TOP_LEFT][1].getAbsoluteValue(A.height),s=t[B.TOP_RIGHT][0].getAbsoluteValue(A.width),a=t[B.TOP_RIGHT][1].getAbsoluteValue(A.height),i=t[B.BOTTOM_RIGHT][0].getAbsoluteValue(A.width),c=t[B.BOTTOM_RIGHT][1].getAbsoluteValue(A.height),u=t[B.BOTTOM_LEFT][0].getAbsoluteValue(A.width),d=t[B.BOTTOM_LEFT][1].getAbsoluteValue(A.height),w=[];w.push((r+s)/A.width),w.push((u+i)/A.width),w.push((o+d)/A.height),w.push((a+c)/A.height);var Q=Math.max.apply(Math,w);Q>1&&(r/=Q,o/=Q,s/=Q,a/=Q,i/=Q,c/=Q,u/=Q,d/=Q);var g=A.width-s,h=A.height-c,f=A.width-i,U=A.height-d;return{topLeftOuter:r>0||o>0?l(A.left,A.top,r,o,B.TOP_LEFT):new n.default(A.left,A.top),topLeftInner:r>0||o>0?l(A.left+e[3].borderWidth,A.top+e[0].borderWidth,Math.max(0,r-e[3].borderWidth),Math.max(0,o-e[0].borderWidth),B.TOP_LEFT):new n.default(A.left+e[3].borderWidth,A.top+e[0].borderWidth),topRightOuter:s>0||a>0?l(A.left+g,A.top,s,a,B.TOP_RIGHT):new n.default(A.left+A.width,A.top),topRightInner:s>0||a>0?l(A.left+Math.min(g,A.width+e[3].borderWidth),A.top+e[0].borderWidth,g>A.width+e[3].borderWidth?0:s-e[3].borderWidth,a-e[0].borderWidth,B.TOP_RIGHT):new n.default(A.left+A.width-e[1].borderWidth,A.top+e[0].borderWidth),bottomRightOuter:i>0||c>0?l(A.left+f,A.top+h,i,c,B.BOTTOM_RIGHT):new n.default(A.left+A.width,A.top+A.height),bottomRightInner:i>0||c>0?l(A.left+Math.min(f,A.width-e[3].borderWidth),A.top+Math.min(h,A.height+e[0].borderWidth),Math.max(0,i-e[1].borderWidth),c-e[2].borderWidth,B.BOTTOM_RIGHT):new n.default(A.left+A.width-e[1].borderWidth,A.top+A.height-e[2].borderWidth),bottomLeftOuter:u>0||d>0?l(A.left,A.top+U,u,d,B.BOTTOM_LEFT):new n.default(A.left,A.top+A.height),bottomLeftInner:u>0||d>0?l(A.left+e[3].borderWidth,A.top+U,Math.max(0,u-e[3].borderWidth),d-e[2].borderWidth,B.BOTTOM_LEFT):new n.default(A.left+e[3].borderWidth,A.top+A.height-e[2].borderWidth)}},{TOP_LEFT:0,TOP_RIGHT:1,BOTTOM_RIGHT:2,BOTTOM_LEFT:3}),l=function(A,e,t,r,s){var a=(Math.sqrt(2)-1)/3*4,i=t*a,l=r*a,c=A+t,u=e+r;switch(s){case B.TOP_LEFT:return new o.default(new n.default(A,u),new n.default(A,u-l),new n.default(c-i,e),new n.default(c,e));case B.TOP_RIGHT:return new o.default(new n.default(A,e),new n.default(A+i,e),new n.default(c,u-l),new n.default(c,u));case B.BOTTOM_RIGHT:return new o.default(new n.default(c,e),new n.default(c,e+l),new n.default(A+i,u),new n.default(A,u));case B.BOTTOM_LEFT:default:return new o.default(new n.default(c,u),new n.default(c-i,u),new n.default(A,e+l),new n.default(A,e))}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),o=(r=t(0))&&r.__esModule?r:{default:r},s=t(4),a=t(5),i=t(12),B=t(33),l=t(34),c=t(35),u=t(36),d=t(37),w=t(38),Q=t(8),g=t(39),h=t(40),f=t(18),U=t(17),C=t(19),E=t(11),F=t(41),p=t(20),H=t(42),m=t(43),v=t(44),b=t(45),I=t(2),T=t(21),N=t(14),y=["INPUT","TEXTAREA","SELECT"],K=function(){function A(e,t,r,n){var s=this;!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.parent=t,this.tagName=e.tagName,this.index=n,this.childNodes=[],this.listItems=[],"number"==typeof e.start&&(this.listStart=e.start);var K=e.ownerDocument.defaultView,L=K.pageXOffset,M=K.pageYOffset,D=K.getComputedStyle(e,null),O=(0,l.parseDisplay)(D.display),_="radio"===e.type||"checkbox"===e.type,R=(0,C.parsePosition)(D.position);if(this.style={background:_?T.INPUT_BACKGROUND:(0,a.parseBackground)(D,r),border:_?T.INPUT_BORDERS:(0,i.parseBorder)(D),borderRadius:(e instanceof K.HTMLInputElement||e instanceof HTMLInputElement)&&_?(0,T.getInputBorderRadius)(e):(0,B.parseBorderRadius)(D),color:_?T.INPUT_COLOR:new o.default(D.color),display:O,float:(0,c.parseCSSFloat)(D.float),font:(0,u.parseFont)(D),letterSpacing:(0,d.parseLetterSpacing)(D.letterSpacing),listStyle:O===l.DISPLAY.LIST_ITEM?(0,Q.parseListStyle)(D):null,lineBreak:(0,w.parseLineBreak)(D.lineBreak),margin:(0,g.parseMargin)(D),opacity:parseFloat(D.opacity),overflow:-1===y.indexOf(e.tagName)?(0,h.parseOverflow)(D.overflow):h.OVERFLOW.HIDDEN,overflowWrap:(0,f.parseOverflowWrap)(D.overflowWrap?D.overflowWrap:D.wordWrap),padding:(0,U.parsePadding)(D),position:R,textDecoration:(0,E.parseTextDecoration)(D),textShadow:(0,F.parseTextShadow)(D.textShadow),textTransform:(0,p.parseTextTransform)(D.textTransform),transform:(0,H.parseTransform)(D),visibility:(0,m.parseVisibility)(D.visibility),wordBreak:(0,v.parseWordBreak)(D.wordBreak),zIndex:(0,b.parseZIndex)(R!==C.POSITION.STATIC?D.zIndex:"auto")},this.isTransformed()&&(e.style.transform="matrix(1,0,0,1,0,0)"),O===l.DISPLAY.LIST_ITEM){var P=(0,N.getListOwner)(this);if(P){var k=P.listItems.length;P.listItems.push(this),this.listIndex=e.hasAttribute("value")&&"number"==typeof e.value?e.value:0===k?"number"==typeof P.listStart?P.listStart:1:P.listItems[k-1].listIndex+1}}"IMG"===e.tagName&&e.addEventListener("load",function(){s.bounds=(0,I.parseBounds)(e,L,M),s.curvedBounds=(0,I.parseBoundCurves)(s.bounds,s.style.border,s.style.borderRadius)}),this.image=S(e,r),this.bounds=_?(0,T.reformatInputBounds)((0,I.parseBounds)(e,L,M)):(0,I.parseBounds)(e,L,M),this.curvedBounds=(0,I.parseBoundCurves)(this.bounds,this.style.border,this.style.borderRadius)}return n(A,[{key:"getClipPaths",value:function(){var A=this.parent?this.parent.getClipPaths():[];return this.style.overflow!==h.OVERFLOW.VISIBLE?A.concat([(0,I.calculatePaddingBoxPath)(this.curvedBounds)]):A}},{key:"isInFlow",value:function(){return this.isRootElement()&&!this.isFloating()&&!this.isAbsolutelyPositioned()}},{key:"isVisible",value:function(){return!(0,s.contains)(this.style.display,l.DISPLAY.NONE)&&this.style.opacity>0&&this.style.visibility===m.VISIBILITY.VISIBLE}},{key:"isAbsolutelyPositioned",value:function(){return this.style.position!==C.POSITION.STATIC&&this.style.position!==C.POSITION.RELATIVE}},{key:"isPositioned",value:function(){return this.style.position!==C.POSITION.STATIC}},{key:"isFloating",value:function(){return this.style.float!==c.FLOAT.NONE}},{key:"isRootElement",value:function(){return null===this.parent}},{key:"isTransformed",value:function(){return null!==this.style.transform}},{key:"isPositionedWithZIndex",value:function(){return this.isPositioned()&&!this.style.zIndex.auto}},{key:"isInlineLevel",value:function(){return(0,s.contains)(this.style.display,l.DISPLAY.INLINE)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_BLOCK)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_FLEX)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_GRID)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_LIST_ITEM)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_TABLE)}},{key:"isInlineBlockOrInlineTable",value:function(){return(0,s.contains)(this.style.display,l.DISPLAY.INLINE_BLOCK)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_TABLE)}}]),A}();e.default=K;var S=function(A,e){if(A instanceof A.ownerDocument.defaultView.SVGSVGElement||A instanceof SVGSVGElement){var t=new XMLSerializer;return e.loadImage("data:image/svg+xml,"+encodeURIComponent(t.serializeToString(A)))}switch(A.tagName){case"IMG":var r=A;return e.loadImage(r.currentSrc||r.src);case"CANVAS":var n=A;return e.loadCanvas(n);case"IFRAME":var o=A.getAttribute("data-html2canvas-internal-iframe-key");if(o)return o}return null}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.contains=function(A,e){return 0!=(A&e)},e.distance=function(A,e){return Math.sqrt(A*A+e*e)},e.copyCSSStyles=function(A,e){for(var t=A.length-1;t>=0;t--){var r=A.item(t);"content"!==r&&e.style.setProperty(r,A.getPropertyValue(r))}return e},e.SMALL_IMAGE="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseBackgroundImage=e.parseBackground=e.calculateBackgroundRepeatPath=e.calculateBackgroundPosition=e.calculateBackgroungPositioningArea=e.calculateBackgroungPaintingArea=e.calculateGradientBackgroundSize=e.calculateBackgroundSize=e.BACKGROUND_ORIGIN=e.BACKGROUND_CLIP=e.BACKGROUND_SIZE=e.BACKGROUND_REPEAT=void 0;var r=B(t(0)),n=B(t(1)),o=B(t(31)),s=B(t(7)),a=t(2),i=t(17);function B(A){return A&&A.__esModule?A:{default:A}}var l=e.BACKGROUND_REPEAT={REPEAT:0,NO_REPEAT:1,REPEAT_X:2,REPEAT_Y:3},c=e.BACKGROUND_SIZE={AUTO:0,CONTAIN:1,COVER:2,LENGTH:3},u=e.BACKGROUND_CLIP={BORDER_BOX:0,PADDING_BOX:1,CONTENT_BOX:2},d=e.BACKGROUND_ORIGIN=u,w=function A(e){switch(function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),e){case"contain":this.size=c.CONTAIN;break;case"cover":this.size=c.COVER;break;case"auto":this.size=c.AUTO;break;default:this.value=new n.default(e)}},Q=(e.calculateBackgroundSize=function(A,e,t){var r=0,n=0,s=A.size;if(s[0].size===c.CONTAIN||s[0].size===c.COVER){var a=t.width/t.height,i=e.width/e.height;return a<i!=(s[0].size===c.COVER)?new o.default(t.width,t.width/i):new o.default(t.height*i,t.height)}return s[0].value&&(r=s[0].value.getAbsoluteValue(t.width)),s[0].size===c.AUTO&&s[1].size===c.AUTO?n=e.height:s[1].size===c.AUTO?n=r/e.width*e.height:s[1].value&&(n=s[1].value.getAbsoluteValue(t.height)),s[0].size===c.AUTO&&(r=n/e.height*e.width),new o.default(r,n)},e.calculateGradientBackgroundSize=function(A,e){var t=A.size,r=t[0].value?t[0].value.getAbsoluteValue(e.width):e.width,n=t[1].value?t[1].value.getAbsoluteValue(e.height):t[0].value?r:e.height;return new o.default(r,n)},new w("auto")),g=(e.calculateBackgroungPaintingArea=function(A,e){switch(e){case u.BORDER_BOX:return(0,a.calculateBorderBoxPath)(A);case u.PADDING_BOX:default:return(0,a.calculatePaddingBoxPath)(A)}},e.calculateBackgroungPositioningArea=function(A,e,t,r){var n=(0,a.calculatePaddingBox)(e,r);switch(A){case d.BORDER_BOX:return e;case d.CONTENT_BOX:var o=t[i.PADDING_SIDES.LEFT].getAbsoluteValue(e.width),s=t[i.PADDING_SIDES.RIGHT].getAbsoluteValue(e.width),B=t[i.PADDING_SIDES.TOP].getAbsoluteValue(e.width),l=t[i.PADDING_SIDES.BOTTOM].getAbsoluteValue(e.width);return new a.Bounds(n.left+o,n.top+B,n.width-o-s,n.height-B-l);case d.PADDING_BOX:default:return n}},e.calculateBackgroundPosition=function(A,e,t){return new s.default(A[0].getAbsoluteValue(t.width-e.width),A[1].getAbsoluteValue(t.height-e.height))},e.calculateBackgroundRepeatPath=function(A,e,t,r,n){switch(A.repeat){case l.REPEAT_X:return[new s.default(Math.round(n.left),Math.round(r.top+e.y)),new s.default(Math.round(n.left+n.width),Math.round(r.top+e.y)),new s.default(Math.round(n.left+n.width),Math.round(t.height+r.top+e.y)),new s.default(Math.round(n.left),Math.round(t.height+r.top+e.y))];case l.REPEAT_Y:return[new s.default(Math.round(r.left+e.x),Math.round(n.top)),new s.default(Math.round(r.left+e.x+t.width),Math.round(n.top)),new s.default(Math.round(r.left+e.x+t.width),Math.round(n.height+n.top)),new s.default(Math.round(r.left+e.x),Math.round(n.height+n.top))];case l.NO_REPEAT:return[new s.default(Math.round(r.left+e.x),Math.round(r.top+e.y)),new s.default(Math.round(r.left+e.x+t.width),Math.round(r.top+e.y)),new s.default(Math.round(r.left+e.x+t.width),Math.round(r.top+e.y+t.height)),new s.default(Math.round(r.left+e.x),Math.round(r.top+e.y+t.height))];default:return[new s.default(Math.round(n.left),Math.round(n.top)),new s.default(Math.round(n.left+n.width),Math.round(n.top)),new s.default(Math.round(n.left+n.width),Math.round(n.height+n.top)),new s.default(Math.round(n.left),Math.round(n.height+n.top))]}},e.parseBackground=function(A,e){return{backgroundColor:new r.default(A.backgroundColor),backgroundImage:f(A,e),backgroundClip:g(A.backgroundClip),backgroundOrigin:h(A.backgroundOrigin)}},function(A){switch(A){case"padding-box":return u.PADDING_BOX;case"content-box":return u.CONTENT_BOX}return u.BORDER_BOX}),h=function(A){switch(A){case"padding-box":return d.PADDING_BOX;case"content-box":return d.CONTENT_BOX}return d.BORDER_BOX},f=function(A,e){var t=E(A.backgroundImage).map(function(A){if("url"===A.method){var t=e.loadImage(A.args[0]);A.args=t?[t]:[]}return A}),r=A.backgroundPosition.split(","),n=A.backgroundRepeat.split(","),o=A.backgroundSize.split(",");return t.map(function(A,e){var t=(o[e]||"auto").trim().split(" ").map(U),s=(r[e]||"auto").trim().split(" ").map(C);return{source:A,repeat:function(A){switch(("string"==typeof n[e]?n[e]:n[0]).trim()){case"no-repeat":return l.NO_REPEAT;case"repeat-x":case"repeat no-repeat":return l.REPEAT_X;case"repeat-y":case"no-repeat repeat":return l.REPEAT_Y;case"repeat":return l.REPEAT}return l.REPEAT}(),size:t.length<2?[t[0],Q]:[t[0],t[1]],position:s.length<2?[s[0],s[0]]:[s[0],s[1]]}})},U=function(A){return"auto"===A?Q:new w(A)},C=function(A){switch(A){case"bottom":case"right":return new n.default("100%");case"left":case"top":return new n.default("0%");case"auto":return new n.default("0")}return new n.default(A)},E=e.parseBackgroundImage=function(A){var e=/^\s$/,t=[],r=[],n="",o=null,s="",a=0,i=0,B=function(){var A="";if(n){'"'===s.substr(0,1)&&(s=s.substr(1,s.length-2)),s&&r.push(s.trim());var e=n.indexOf("-",1)+1;"-"===n.substr(0,1)&&e>0&&(A=n.substr(0,e).toLowerCase(),n=n.substr(e)),"none"!==(n=n.toLowerCase())&&t.push({prefix:A,method:n,args:r})}r=[],n=s=""};return A.split("").forEach(function(A){if(0!==a||!e.test(A)){switch(A){case'"':o?o===A&&(o=null):o=A;break;case"(":if(o)break;if(0===a)return void(a=1);i++;break;case")":if(o)break;if(1===a){if(0===i)return a=0,void B();i--}break;case",":if(o)break;if(0===a)return void B();if(1===a&&0===i&&!n.match(/^url$/i))return r.push(s.trim()),void(s="")}0===a?n+=A:s+=A}}),B(),t}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.PATH={VECTOR:0,BEZIER_CURVE:1,CIRCLE:2}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=t(6);e.default=function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type=r.PATH.VECTOR,this.x=e,this.y=t}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseListStyle=e.parseListStyleType=e.LIST_STYLE_TYPE=e.LIST_STYLE_POSITION=void 0;var r=t(5),n=e.LIST_STYLE_POSITION={INSIDE:0,OUTSIDE:1},o=e.LIST_STYLE_TYPE={NONE:-1,DISC:0,CIRCLE:1,SQUARE:2,DECIMAL:3,CJK_DECIMAL:4,DECIMAL_LEADING_ZERO:5,LOWER_ROMAN:6,UPPER_ROMAN:7,LOWER_GREEK:8,LOWER_ALPHA:9,UPPER_ALPHA:10,ARABIC_INDIC:11,ARMENIAN:12,BENGALI:13,CAMBODIAN:14,CJK_EARTHLY_BRANCH:15,CJK_HEAVENLY_STEM:16,CJK_IDEOGRAPHIC:17,DEVANAGARI:18,ETHIOPIC_NUMERIC:19,GEORGIAN:20,GUJARATI:21,GURMUKHI:22,HEBREW:22,HIRAGANA:23,HIRAGANA_IROHA:24,JAPANESE_FORMAL:25,JAPANESE_INFORMAL:26,KANNADA:27,KATAKANA:28,KATAKANA_IROHA:29,KHMER:30,KOREAN_HANGUL_FORMAL:31,KOREAN_HANJA_FORMAL:32,KOREAN_HANJA_INFORMAL:33,LAO:34,LOWER_ARMENIAN:35,MALAYALAM:36,MONGOLIAN:37,MYANMAR:38,ORIYA:39,PERSIAN:40,SIMP_CHINESE_FORMAL:41,SIMP_CHINESE_INFORMAL:42,TAMIL:43,TELUGU:44,THAI:45,TIBETAN:46,TRAD_CHINESE_FORMAL:47,TRAD_CHINESE_INFORMAL:48,UPPER_ARMENIAN:49,DISCLOSURE_OPEN:50,DISCLOSURE_CLOSED:51},s=e.parseListStyleType=function(A){switch(A){case"disc":return o.DISC;case"circle":return o.CIRCLE;case"square":return o.SQUARE;case"decimal":return o.DECIMAL;case"cjk-decimal":return o.CJK_DECIMAL;case"decimal-leading-zero":return o.DECIMAL_LEADING_ZERO;case"lower-roman":return o.LOWER_ROMAN;case"upper-roman":return o.UPPER_ROMAN;case"lower-greek":return o.LOWER_GREEK;case"lower-alpha":return o.LOWER_ALPHA;case"upper-alpha":return o.UPPER_ALPHA;case"arabic-indic":return o.ARABIC_INDIC;case"armenian":return o.ARMENIAN;case"bengali":return o.BENGALI;case"cambodian":return o.CAMBODIAN;case"cjk-earthly-branch":return o.CJK_EARTHLY_BRANCH;case"cjk-heavenly-stem":return o.CJK_HEAVENLY_STEM;case"cjk-ideographic":return o.CJK_IDEOGRAPHIC;case"devanagari":return o.DEVANAGARI;case"ethiopic-numeric":return o.ETHIOPIC_NUMERIC;case"georgian":return o.GEORGIAN;case"gujarati":return o.GUJARATI;case"gurmukhi":return o.GURMUKHI;case"hebrew":return o.HEBREW;case"hiragana":return o.HIRAGANA;case"hiragana-iroha":return o.HIRAGANA_IROHA;case"japanese-formal":return o.JAPANESE_FORMAL;case"japanese-informal":return o.JAPANESE_INFORMAL;case"kannada":return o.KANNADA;case"katakana":return o.KATAKANA;case"katakana-iroha":return o.KATAKANA_IROHA;case"khmer":return o.KHMER;case"korean-hangul-formal":return o.KOREAN_HANGUL_FORMAL;case"korean-hanja-formal":return o.KOREAN_HANJA_FORMAL;case"korean-hanja-informal":return o.KOREAN_HANJA_INFORMAL;case"lao":return o.LAO;case"lower-armenian":return o.LOWER_ARMENIAN;case"malayalam":return o.MALAYALAM;case"mongolian":return o.MONGOLIAN;case"myanmar":return o.MYANMAR;case"oriya":return o.ORIYA;case"persian":return o.PERSIAN;case"simp-chinese-formal":return o.SIMP_CHINESE_FORMAL;case"simp-chinese-informal":return o.SIMP_CHINESE_INFORMAL;case"tamil":return o.TAMIL;case"telugu":return o.TELUGU;case"thai":return o.THAI;case"tibetan":return o.TIBETAN;case"trad-chinese-formal":return o.TRAD_CHINESE_FORMAL;case"trad-chinese-informal":return o.TRAD_CHINESE_INFORMAL;case"upper-armenian":return o.UPPER_ARMENIAN;case"disclosure-open":return o.DISCLOSURE_OPEN;case"disclosure-closed":return o.DISCLOSURE_CLOSED;case"none":default:return o.NONE}},a=(e.parseListStyle=function(A){var e=(0,r.parseBackgroundImage)(A.getPropertyValue("list-style-image"));return{listStyleType:s(A.getPropertyValue("list-style-type")),listStyleImage:e.length?e[0]:null,listStylePosition:a(A.getPropertyValue("list-style-position"))}},function(A){switch(A){case"inside":return n.INSIDE;case"outside":default:return n.OUTSIDE}})},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(20),o=t(22),s=function(){function A(e,t,r){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.text=e,this.parent=t,this.bounds=r}return r(A,null,[{key:"fromTextNode",value:function(e,t){var r=i(e.data,t.style.textTransform);return new A(r,t,(0,o.parseTextBounds)(r,t,e))}}]),A}();e.default=s;var a=/(^|\s|:|-|\(|\))([a-z])/g,i=function(A,e){switch(e){case n.TEXT_TRANSFORM.LOWERCASE:return A.toLowerCase();case n.TEXT_TRANSFORM.CAPITALIZE:return A.replace(a,B);case n.TEXT_TRANSFORM.UPPERCASE:return A.toUpperCase();default:return A}};function B(A,e,t){return A.length>0?e+t.toUpperCase():A}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=t(23),n=function(A){return 0===A[0]&&255===A[1]&&0===A[2]&&255===A[3]},o={get SUPPORT_RANGE_BOUNDS(){var A=function(A){if(A.createRange){var e=A.createRange();if(e.getBoundingClientRect){var t=A.createElement("boundtest");t.style.height="123px",t.style.display="block",A.body.appendChild(t),e.selectNode(t);var r=e.getBoundingClientRect(),n=Math.round(r.height);if(A.body.removeChild(t),123===n)return!0}}return!1}(document);return Object.defineProperty(o,"SUPPORT_RANGE_BOUNDS",{value:A}),A},get SUPPORT_SVG_DRAWING(){var A=function(A){var e=new Image,t=A.createElement("canvas"),r=t.getContext("2d");e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{r.drawImage(e,0,0),t.toDataURL()}catch(A){return!1}return!0}(document);return Object.defineProperty(o,"SUPPORT_SVG_DRAWING",{value:A}),A},get SUPPORT_BASE64_DRAWING(){return function(A){var e=function(A,e){var t=new Image,r=A.createElement("canvas"),n=r.getContext("2d");return new Promise(function(A){t.src=e;var o=function(){try{n.drawImage(t,0,0),r.toDataURL()}catch(e){return A(!1)}return A(!0)};t.onload=o,t.onerror=function(){return A(!1)},!0===t.complete&&setTimeout(function(){o()},500)})}(document,A);return Object.defineProperty(o,"SUPPORT_BASE64_DRAWING",{value:function(){return e}}),e}},get SUPPORT_FOREIGNOBJECT_DRAWING(){var A="function"==typeof Array.from&&"function"==typeof window.fetch?function(A){var e=A.createElement("canvas");e.width=100,e.height=100;var t=e.getContext("2d");t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,100,100);var o=new Image,s=e.toDataURL();o.src=s;var a=(0,r.createForeignObjectSVG)(100,100,0,0,o);return t.fillStyle="red",t.fillRect(0,0,100,100),(0,r.loadSerializedSVG)(a).then(function(e){t.drawImage(e,0,0);var o=t.getImageData(0,0,100,100).data;t.fillStyle="red",t.fillRect(0,0,100,100);var a=A.createElement("div");return a.style.backgroundImage="url("+s+")",a.style.height="100px",n(o)?(0,r.loadSerializedSVG)((0,r.createForeignObjectSVG)(100,100,0,0,a)):Promise.reject(!1)}).then(function(A){return t.drawImage(A,0,0),n(t.getImageData(0,0,100,100).data)}).catch(function(A){return!1})}(document):Promise.resolve(!1);return Object.defineProperty(o,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:A}),A},get SUPPORT_CORS_IMAGES(){var A=void 0!==(new Image).crossOrigin;return Object.defineProperty(o,"SUPPORT_CORS_IMAGES",{value:A}),A},get SUPPORT_RESPONSE_TYPE(){var A="string"==typeof(new XMLHttpRequest).responseType;return Object.defineProperty(o,"SUPPORT_RESPONSE_TYPE",{value:A}),A},get SUPPORT_CORS_XHR(){var A="withCredentials"in new XMLHttpRequest;return Object.defineProperty(o,"SUPPORT_CORS_XHR",{value:A}),A}};e.default=o},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseTextDecoration=e.TEXT_DECORATION_LINE=e.TEXT_DECORATION=e.TEXT_DECORATION_STYLE=void 0;var r,n=(r=t(0))&&r.__esModule?r:{default:r},o=e.TEXT_DECORATION_STYLE={SOLID:0,DOUBLE:1,DOTTED:2,DASHED:3,WAVY:4},s=e.TEXT_DECORATION={NONE:null},a=e.TEXT_DECORATION_LINE={UNDERLINE:1,OVERLINE:2,LINE_THROUGH:3,BLINK:4},i=function(A){switch(A){case"underline":return a.UNDERLINE;case"overline":return a.OVERLINE;case"line-through":return a.LINE_THROUGH}return a.BLINK};e.parseTextDecoration=function(A){var e,t="none"===(e=A.textDecorationLine?A.textDecorationLine:A.textDecoration)?null:e.split(" ").map(i);return null===t?s.NONE:{textDecorationLine:t,textDecorationColor:A.textDecorationColor?new n.default(A.textDecorationColor):null,textDecorationStyle:function(A){switch(A){case"double":return o.DOUBLE;case"dotted":return o.DOTTED;case"dashed":return o.DASHED;case"wavy":return o.WAVY}return o.SOLID}(A.textDecorationStyle)}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseBorder=e.BORDER_SIDES=e.BORDER_STYLE=void 0;var r,n=(r=t(0))&&r.__esModule?r:{default:r},o=e.BORDER_STYLE={NONE:0,SOLID:1},s=e.BORDER_SIDES={TOP:0,RIGHT:1,BOTTOM:2,LEFT:3},a=Object.keys(s).map(function(A){return A.toLowerCase()});e.parseBorder=function(A){return a.map(function(e){var t=new n.default(A.getPropertyValue("border-"+e+"-color")),r=function(A){switch(A){case"none":return o.NONE}return o.SOLID}(A.getPropertyValue("border-"+e+"-style")),s=parseFloat(A.getPropertyValue("border-"+e+"-width"));return{borderColor:t,borderStyle:r,borderWidth:isNaN(s)?0:s}})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.toCodePoints=function(A){for(var e=[],t=0,r=A.length;t<r;){var n=A.charCodeAt(t++);if(n>=55296&&n<=56319&&t<r){var o=A.charCodeAt(t++);56320==(64512&o)?e.push(((1023&n)<<10)+(1023&o)+65536):(e.push(n),t--)}else e.push(n)}return e},e.fromCodePoint=function(){if(String.fromCodePoint)return String.fromCodePoint.apply(String,arguments);var A=arguments.length;if(!A)return"";for(var e=[],t=-1,r="";++t<A;){var n=arguments.length<=t?void 0:arguments[t];n<=65535?e.push(n):(n-=65536,e.push(55296+(n>>10),n%1024+56320)),(t+1===A||e.length>16384)&&(r+=String.fromCharCode.apply(String,e),e.length=0)}return r};for(var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n="undefined"==typeof Uint8Array?[]:new Uint8Array(256),o=0;o<r.length;o++)n[r.charCodeAt(o)]=o;e.decode=function(A){var e=.75*A.length,t=A.length,r=void 0,o=0,s=void 0,a=void 0,i=void 0,B=void 0;"="===A[A.length-1]&&(e--,"="===A[A.length-2]&&e--);var l="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array&&void 0!==Uint8Array.prototype.slice?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(r=0;r<t;r+=4)s=n[A.charCodeAt(r)],a=n[A.charCodeAt(r+1)],i=n[A.charCodeAt(r+2)],B=n[A.charCodeAt(r+3)],c[o++]=s<<2|a>>4,c[o++]=(15&a)<<4|i>>2,c[o++]=(3&i)<<6|63&B;return l},e.polyUint16Array=function(A){for(var e=A.length,t=[],r=0;r<e;r+=2)t.push(A[r+1]<<8|A[r]);return t},e.polyUint32Array=function(A){for(var e=A.length,t=[],r=0;r<e;r+=4)t.push(A[r+3]<<24|A[r+2]<<16|A[r+1]<<8|A[r]);return t}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.createCounterText=e.inlineListItemElement=e.getListOwner=void 0;var r=t(4),n=i(t(3)),o=i(t(9)),s=t(8),a=t(24);function i(A){return A&&A.__esModule?A:{default:A}}var B=["OL","UL","MENU"],l=(e.getListOwner=function(A){var e=A.parent;if(!e)return null;do{if(-1!==B.indexOf(e.tagName))return e;e=e.parent}while(e);return A.parent},e.inlineListItemElement=function(A,e,t){var a=e.style.listStyle;if(a){var i=A.ownerDocument.defaultView.getComputedStyle(A,null),B=A.ownerDocument.createElement("html2canvaswrapper");switch((0,r.copyCSSStyles)(i,B),B.style.position="absolute",B.style.bottom="auto",B.style.display="block",B.style.letterSpacing="normal",a.listStylePosition){case s.LIST_STYLE_POSITION.OUTSIDE:B.style.left="auto",B.style.right=A.ownerDocument.defaultView.innerWidth-e.bounds.left-e.style.margin[1].getAbsoluteValue(e.bounds.width)+7+"px",B.style.textAlign="right";break;case s.LIST_STYLE_POSITION.INSIDE:B.style.left=e.bounds.left-e.style.margin[3].getAbsoluteValue(e.bounds.width)+"px",B.style.right="auto",B.style.textAlign="left"}var l=void 0,c=e.style.margin[0].getAbsoluteValue(e.bounds.width),u=a.listStyleImage;if(u)if("url"===u.method){var d=A.ownerDocument.createElement("img");d.src=u.args[0],B.style.top=e.bounds.top-c+"px",B.style.width="auto",B.style.height="auto",B.appendChild(d)}else{var w=.5*parseFloat(e.style.font.fontSize);B.style.top=e.bounds.top-c+e.bounds.height-1.5*w+"px",B.style.width=w+"px",B.style.height=w+"px",B.style.backgroundImage=i.listStyleImage}else"number"==typeof e.listIndex&&(l=A.ownerDocument.createTextNode(U(e.listIndex,a.listStyleType,!0)),B.appendChild(l),B.style.top=e.bounds.top-c+"px");var Q=A.ownerDocument.body;Q.appendChild(B),l?(e.childNodes.push(o.default.fromTextNode(l,e)),Q.removeChild(B)):e.childNodes.push(new n.default(B,e,t,0))}},{integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]}),c={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},u={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},d={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},w=function(A,e,t,r,n,o){return A<e||A>t?U(A,n,o.length>0):r.integers.reduce(function(e,t,n){for(;A>=t;)A-=t,e+=r.values[n];return e},"")+o},Q=function(A,e,t,r){var n="";do{t||A--,n=r(A)+n,A/=e}while(A*e>=e);return n},g=function(A,e,t,r,n){var o=t-e+1;return(A<0?"-":"")+(Q(Math.abs(A),o,r,function(A){return(0,a.fromCodePoint)(Math.floor(A%o)+e)})+n)},h=function(A,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:". ",r=e.length;return Q(Math.abs(A),r,!1,function(A){return e[Math.floor(A%r)]})+t},f=function(A,e,t,n,o,a){if(A<-9999||A>9999)return U(A,s.LIST_STYLE_TYPE.CJK_DECIMAL,o.length>0);var i=Math.abs(A),B=o;if(0===i)return e[0]+B;for(var l=0;i>0&&l<=4;l++){var c=i%10;0===c&&(0,r.contains)(a,1)&&""!==B?B=e[c]+B:c>1||1===c&&0===l||1===c&&1===l&&(0,r.contains)(a,2)||1===c&&1===l&&(0,r.contains)(a,4)&&A>100||1===c&&l>1&&(0,r.contains)(a,8)?B=e[c]+(l>0?t[l-1]:"")+B:1===c&&l>0&&(B=t[l-1]+B),i=Math.floor(i/10)}return(A<0?n:"")+B},U=e.createCounterText=function(A,e,t){var r=t?". ":"",n=t?"、":"",o=t?", ":"";switch(e){case s.LIST_STYLE_TYPE.DISC:return"•";case s.LIST_STYLE_TYPE.CIRCLE:return"◦";case s.LIST_STYLE_TYPE.SQUARE:return"◾";case s.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:var a=g(A,48,57,!0,r);return a.length<4?"0"+a:a;case s.LIST_STYLE_TYPE.CJK_DECIMAL:return h(A,"〇一二三四五六七八九",n);case s.LIST_STYLE_TYPE.LOWER_ROMAN:return w(A,1,3999,l,s.LIST_STYLE_TYPE.DECIMAL,r).toLowerCase();case s.LIST_STYLE_TYPE.UPPER_ROMAN:return w(A,1,3999,l,s.LIST_STYLE_TYPE.DECIMAL,r);case s.LIST_STYLE_TYPE.LOWER_GREEK:return g(A,945,969,!1,r);case s.LIST_STYLE_TYPE.LOWER_ALPHA:return g(A,97,122,!1,r);case s.LIST_STYLE_TYPE.UPPER_ALPHA:return g(A,65,90,!1,r);case s.LIST_STYLE_TYPE.ARABIC_INDIC:return g(A,1632,1641,!0,r);case s.LIST_STYLE_TYPE.ARMENIAN:case s.LIST_STYLE_TYPE.UPPER_ARMENIAN:return w(A,1,9999,c,s.LIST_STYLE_TYPE.DECIMAL,r);case s.LIST_STYLE_TYPE.LOWER_ARMENIAN:return w(A,1,9999,c,s.LIST_STYLE_TYPE.DECIMAL,r).toLowerCase();case s.LIST_STYLE_TYPE.BENGALI:return g(A,2534,2543,!0,r);case s.LIST_STYLE_TYPE.CAMBODIAN:case s.LIST_STYLE_TYPE.KHMER:return g(A,6112,6121,!0,r);case s.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:return h(A,"子丑寅卯辰巳午未申酉戌亥",n);case s.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:return h(A,"甲乙丙丁戊己庚辛壬癸",n);case s.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:case s.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:return f(A,"零一二三四五六七八九","十百千萬","負",n,14);case s.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:return f(A,"零壹貳參肆伍陸柒捌玖","拾佰仟萬","負",n,15);case s.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:return f(A,"零一二三四五六七八九","十百千萬","负",n,14);case s.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:return f(A,"零壹贰叁肆伍陆柒捌玖","拾佰仟萬","负",n,15);case s.LIST_STYLE_TYPE.JAPANESE_INFORMAL:return f(A,"〇一二三四五六七八九","十百千万","マイナス",n,0);case s.LIST_STYLE_TYPE.JAPANESE_FORMAL:return f(A,"零壱弐参四伍六七八九","拾百千万","マイナス",n,7);case s.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:return f(A,"영일이삼사오육칠팔구","십백천만","마이너스 ",o,7);case s.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:return f(A,"零一二三四五六七八九","十百千萬","마이너스 ",o,0);case s.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:return f(A,"零壹貳參四五六七八九","拾百千","마이너스 ",o,7);case s.LIST_STYLE_TYPE.DEVANAGARI:return g(A,2406,2415,!0,r);case s.LIST_STYLE_TYPE.GEORGIAN:return w(A,1,19999,d,s.LIST_STYLE_TYPE.DECIMAL,r);case s.LIST_STYLE_TYPE.GUJARATI:return g(A,2790,2799,!0,r);case s.LIST_STYLE_TYPE.GURMUKHI:return g(A,2662,2671,!0,r);case s.LIST_STYLE_TYPE.HEBREW:return w(A,1,10999,u,s.LIST_STYLE_TYPE.DECIMAL,r);case s.LIST_STYLE_TYPE.HIRAGANA:return h(A,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case s.LIST_STYLE_TYPE.HIRAGANA_IROHA:return h(A,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case s.LIST_STYLE_TYPE.KANNADA:return g(A,3302,3311,!0,r);case s.LIST_STYLE_TYPE.KATAKANA:return h(A,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",n);case s.LIST_STYLE_TYPE.KATAKANA_IROHA:return h(A,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",n);case s.LIST_STYLE_TYPE.LAO:return g(A,3792,3801,!0,r);case s.LIST_STYLE_TYPE.MONGOLIAN:return g(A,6160,6169,!0,r);case s.LIST_STYLE_TYPE.MYANMAR:return g(A,4160,4169,!0,r);case s.LIST_STYLE_TYPE.ORIYA:return g(A,2918,2927,!0,r);case s.LIST_STYLE_TYPE.PERSIAN:return g(A,1776,1785,!0,r);case s.LIST_STYLE_TYPE.TAMIL:return g(A,3046,3055,!0,r);case s.LIST_STYLE_TYPE.TELUGU:return g(A,3174,3183,!0,r);case s.LIST_STYLE_TYPE.THAI:return g(A,3664,3673,!0,r);case s.LIST_STYLE_TYPE.TIBETAN:return g(A,3872,3881,!0,r);case s.LIST_STYLE_TYPE.DECIMAL:default:return g(A,48,57,!0,r)}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(6),o=t(11),s=function(A,e){var t=Math.max.apply(null,A.colorStops.map(function(A){return A.stop})),r=1/Math.max(1,t);A.colorStops.forEach(function(A){e.addColorStop(r*A.stop,A.color.toString())})},a=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.canvas=e||document.createElement("canvas")}return r(A,[{key:"render",value:function(A){this.ctx=this.canvas.getContext("2d"),this.options=A,this.canvas.width=Math.floor(A.width*A.scale),this.canvas.height=Math.floor(A.height*A.scale),this.canvas.style.width=A.width+"px",this.canvas.style.height=A.height+"px",this.ctx.scale(this.options.scale,this.options.scale),this.ctx.translate(-A.x,-A.y),this.ctx.textBaseline="bottom",A.logger.log("Canvas renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+this.options.scale)}},{key:"clip",value:function(A,e){var t=this;A.length&&(this.ctx.save(),A.forEach(function(A){t.path(A),t.ctx.clip()})),e(),A.length&&this.ctx.restore()}},{key:"drawImage",value:function(A,e,t){this.ctx.drawImage(A,e.left,e.top,e.width,e.height,t.left,t.top,t.width,t.height)}},{key:"drawShape",value:function(A,e){this.path(A),this.ctx.fillStyle=e.toString(),this.ctx.fill()}},{key:"fill",value:function(A){this.ctx.fillStyle=A.toString(),this.ctx.fill()}},{key:"getTarget",value:function(){return this.canvas.getContext("2d").setTransform(1,0,0,1,0,0),Promise.resolve(this.canvas)}},{key:"path",value:function(A){var e=this;this.ctx.beginPath(),Array.isArray(A)?A.forEach(function(A,t){var r=A.type===n.PATH.VECTOR?A:A.start;0===t?e.ctx.moveTo(r.x,r.y):e.ctx.lineTo(r.x,r.y),A.type===n.PATH.BEZIER_CURVE&&e.ctx.bezierCurveTo(A.startControl.x,A.startControl.y,A.endControl.x,A.endControl.y,A.end.x,A.end.y)}):this.ctx.arc(A.x+A.radius,A.y+A.radius,A.radius,0,2*Math.PI,!0),this.ctx.closePath()}},{key:"rectangle",value:function(A,e,t,r,n){this.ctx.fillStyle=n.toString(),this.ctx.fillRect(A,e,t,r)}},{key:"renderLinearGradient",value:function(A,e){var t=this.ctx.createLinearGradient(A.left+e.direction.x1,A.top+e.direction.y1,A.left+e.direction.x0,A.top+e.direction.y0);s(e,t),this.ctx.fillStyle=t,this.ctx.fillRect(A.left,A.top,A.width,A.height)}},{key:"renderRadialGradient",value:function(A,e){var t=this,r=A.left+e.center.x,n=A.top+e.center.y,o=this.ctx.createRadialGradient(r,n,0,r,n,e.radius.x);if(o)if(s(e,o),this.ctx.fillStyle=o,e.radius.x!==e.radius.y){var a=A.left+.5*A.width,i=A.top+.5*A.height,B=e.radius.y/e.radius.x,l=1/B;this.transform(a,i,[1,0,0,B,0,0],function(){return t.ctx.fillRect(A.left,l*(A.top-i)+i,A.width,A.height*l)})}else this.ctx.fillRect(A.left,A.top,A.width,A.height)}},{key:"renderRepeat",value:function(A,e,t,r,n){this.path(A),this.ctx.fillStyle=this.ctx.createPattern(this.resizeImage(e,t),"repeat"),this.ctx.translate(r,n),this.ctx.fill(),this.ctx.translate(-r,-n)}},{key:"renderTextNode",value:function(A,e,t,r,n){var s=this;this.ctx.font=[t.fontStyle,t.fontVariant,t.fontWeight,t.fontSize,t.fontFamily].join(" "),A.forEach(function(A){if(s.ctx.fillStyle=e.toString(),n&&A.text.trim().length?n.slice(0).reverse().forEach(function(e){s.ctx.shadowColor=e.color.toString(),s.ctx.shadowOffsetX=e.offsetX*s.options.scale,s.ctx.shadowOffsetY=e.offsetY*s.options.scale,s.ctx.shadowBlur=e.blur,s.ctx.fillText(A.text,A.bounds.left,A.bounds.top+A.bounds.height)}):s.ctx.fillText(A.text,A.bounds.left,A.bounds.top+A.bounds.height),null!==r){var a=r.textDecorationColor||e;r.textDecorationLine.forEach(function(e){switch(e){case o.TEXT_DECORATION_LINE.UNDERLINE:var r=s.options.fontMetrics.getMetrics(t).baseline;s.rectangle(A.bounds.left,Math.round(A.bounds.top+r),A.bounds.width,1,a);break;case o.TEXT_DECORATION_LINE.OVERLINE:s.rectangle(A.bounds.left,Math.round(A.bounds.top),A.bounds.width,1,a);break;case o.TEXT_DECORATION_LINE.LINE_THROUGH:var n=s.options.fontMetrics.getMetrics(t).middle;s.rectangle(A.bounds.left,Math.ceil(A.bounds.top+n),A.bounds.width,1,a)}})}})}},{key:"resizeImage",value:function(A,e){if(A.width===e.width&&A.height===e.height)return A;var t=this.canvas.ownerDocument.createElement("canvas");return t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(A,0,0,A.width,A.height,0,0,e.width,e.height),t}},{key:"setOpacity",value:function(A){this.ctx.globalAlpha=A}},{key:"transform",value:function(A,e,t,r){this.ctx.save(),this.ctx.translate(A,e),this.ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this.ctx.translate(-A,-e),r(),this.ctx.restore()}}]),A}();e.default=a},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=function(){function A(e,t,r){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.enabled="undefined"!=typeof window&&e,this.start=r||Date.now(),this.id=t}return r(A,[{key:"child",value:function(e){return new A(this.enabled,e,this.start)}},{key:"log",value:function(){if(this.enabled&&window.console&&window.console.log){for(var A=arguments.length,e=Array(A),t=0;t<A;t++)e[t]=arguments[t];Function.prototype.bind.call(window.console.log,window.console).apply(window.console,[Date.now()-this.start+"ms",this.id?"html2canvas ("+this.id+"):":"html2canvas:"].concat([].slice.call(e,0)))}}},{key:"error",value:function(){if(this.enabled&&window.console&&window.console.error){for(var A=arguments.length,e=Array(A),t=0;t<A;t++)e[t]=arguments[t];Function.prototype.bind.call(window.console.error,window.console).apply(window.console,[Date.now()-this.start+"ms",this.id?"html2canvas ("+this.id+"):":"html2canvas:"].concat([].slice.call(e,0)))}}}]),A}();e.default=n},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parsePadding=e.PADDING_SIDES=void 0;var r,n=(r=t(1))&&r.__esModule?r:{default:r};e.PADDING_SIDES={TOP:0,RIGHT:1,BOTTOM:2,LEFT:3};var o=["top","right","bottom","left"];e.parsePadding=function(A){return o.map(function(e){return new n.default(A.getPropertyValue("padding-"+e))})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.OVERFLOW_WRAP={NORMAL:0,BREAK_WORD:1};e.parseOverflowWrap=function(A){switch(A){case"break-word":return r.BREAK_WORD;case"normal":default:return r.NORMAL}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.POSITION={STATIC:0,RELATIVE:1,ABSOLUTE:2,FIXED:3,STICKY:4};e.parsePosition=function(A){switch(A){case"relative":return r.RELATIVE;case"absolute":return r.ABSOLUTE;case"fixed":return r.FIXED;case"sticky":return r.STICKY}return r.STATIC}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.TEXT_TRANSFORM={NONE:0,LOWERCASE:1,UPPERCASE:2,CAPITALIZE:3};e.parseTextTransform=function(A){switch(A){case"uppercase":return r.UPPERCASE;case"lowercase":return r.LOWERCASE;case"capitalize":return r.CAPITALIZE}return r.NONE}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.reformatInputBounds=e.inlineSelectElement=e.inlineTextAreaElement=e.inlineInputElement=e.getInputBorderRadius=e.INPUT_BACKGROUND=e.INPUT_BORDERS=e.INPUT_COLOR=void 0;var r=c(t(9)),n=t(5),o=t(12),s=c(t(50)),a=c(t(7)),i=c(t(0)),B=c(t(1)),l=(t(2),t(22),t(4));function c(A){return A&&A.__esModule?A:{default:A}}e.INPUT_COLOR=new i.default([42,42,42]);var u=new i.default([165,165,165]),d=new i.default([222,222,222]),w={borderWidth:1,borderColor:u,borderStyle:o.BORDER_STYLE.SOLID},Q=(e.INPUT_BORDERS=[w,w,w,w],e.INPUT_BACKGROUND={backgroundColor:d,backgroundImage:[],backgroundClip:n.BACKGROUND_CLIP.PADDING_BOX,backgroundOrigin:n.BACKGROUND_ORIGIN.PADDING_BOX},new B.default("50%")),g=[Q,Q],h=[g,g,g,g],f=new B.default("3px"),U=[f,f],C=[U,U,U,U],E=(e.getInputBorderRadius=function(A){return"radio"===A.type?h:C},e.inlineInputElement=function(A,e){if("radio"===A.type||"checkbox"===A.type){if(A.checked){var t=Math.min(e.bounds.width,e.bounds.height);e.childNodes.push("checkbox"===A.type?[new a.default(e.bounds.left+.39363*t,e.bounds.top+.79*t),new a.default(e.bounds.left+.16*t,e.bounds.top+.5549*t),new a.default(e.bounds.left+.27347*t,e.bounds.top+.44071*t),new a.default(e.bounds.left+.39694*t,e.bounds.top+.5649*t),new a.default(e.bounds.left+.72983*t,e.bounds.top+.23*t),new a.default(e.bounds.left+.84*t,e.bounds.top+.34085*t),new a.default(e.bounds.left+.39363*t,e.bounds.top+.79*t)]:new s.default(e.bounds.left+t/4,e.bounds.top+t/4,t/4))}}else E(F(A),A,e,!1)},e.inlineTextAreaElement=function(A,e){E(A.value,A,e,!0)},e.inlineSelectElement=function(A,e){var t=A.options[A.selectedIndex||0];E(t&&t.text||"",A,e,!1)},e.reformatInputBounds=function(A){return A.width>A.height?(A.left+=(A.width-A.height)/2,A.width=A.height):A.width<A.height&&(A.top+=(A.height-A.width)/2,A.height=A.width),A},function(A,e,t,n){var o=e.ownerDocument.body;if(A.length>0&&o){var s=e.ownerDocument.createElement("html2canvaswrapper");(0,l.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e,null),s),s.style.position="absolute",s.style.left=t.bounds.left+"px",s.style.top=t.bounds.top+"px",n||(s.style.whiteSpace="nowrap");var a=e.ownerDocument.createTextNode(A);s.appendChild(a),o.appendChild(s),t.childNodes.push(r.default.fromTextNode(a,t)),o.removeChild(s)}}),F=function(A){var e="password"===A.type?new Array(A.value.length+1).join("•"):A.value;return 0===e.length?A.placeholder||"":e}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseTextBounds=e.TextBounds=void 0;var r,n=t(2),o=t(11),s=(r=t(10))&&r.__esModule?r:{default:r},a=t(24),i=e.TextBounds=function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.text=e,this.bounds=t},B=(e.parseTextBounds=function(A,e,t){for(var r=0!==e.style.letterSpacing?(0,a.toCodePoints)(A).map(function(A){return(0,a.fromCodePoint)(A)}):(0,a.breakWords)(A,e),n=r.length,c=t.parentNode?t.parentNode.ownerDocument.defaultView:null,u=c?c.pageXOffset:0,d=c?c.pageYOffset:0,w=[],Q=0,g=0;g<n;g++){var h=r[g];if(e.style.textDecoration!==o.TEXT_DECORATION.NONE||h.trim().length>0)if(s.default.SUPPORT_RANGE_BOUNDS)w.push(new i(h,l(t,Q,h.length,u,d)));else{var f=t.splitText(h.length);w.push(new i(h,B(t,u,d))),t=f}else s.default.SUPPORT_RANGE_BOUNDS||(t=t.splitText(h.length));Q+=h.length}return w},function(A,e,t){var r=A.ownerDocument.createElement("html2canvaswrapper");r.appendChild(A.cloneNode(!0));var o=A.parentNode;if(o){o.replaceChild(r,A);var s=(0,n.parseBounds)(r,e,t);return r.firstChild&&o.replaceChild(r.firstChild,r),s}return new n.Bounds(0,0,0,0)}),l=function(A,e,t,r,o){var s=A.ownerDocument.createRange();return s.setStart(A,e),s.setEnd(A,e+t),n.Bounds.fromClientRect(s.getBoundingClientRect(),r,o)}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.element=e}return r(A,[{key:"render",value:function(A){var e=this;this.options=A,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=Math.floor(A.width)*A.scale,this.canvas.height=Math.floor(A.height)*A.scale,this.canvas.style.width=A.width+"px",this.canvas.style.height=A.height+"px",A.logger.log("ForeignObject renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+A.scale);var t=o(Math.max(A.windowWidth,A.width)*A.scale,Math.max(A.windowHeight,A.height)*A.scale,A.scrollX*A.scale,A.scrollY*A.scale,this.element);return s(t).then(function(t){return A.backgroundColor&&(e.ctx.fillStyle=A.backgroundColor.toString(),e.ctx.fillRect(0,0,A.width*A.scale,A.height*A.scale)),e.ctx.drawImage(t,-A.x*A.scale,-A.y*A.scale),e.canvas})}}]),A}();e.default=n;var o=e.createForeignObjectSVG=function(A,e,t,r,n){var o="http://www.w3.org/2000/svg",s=document.createElementNS(o,"svg"),a=document.createElementNS(o,"foreignObject");return s.setAttributeNS(null,"width",A),s.setAttributeNS(null,"height",e),a.setAttributeNS(null,"width","100%"),a.setAttributeNS(null,"height","100%"),a.setAttributeNS(null,"x",t),a.setAttributeNS(null,"y",r),a.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(a),a.appendChild(n),s},s=e.loadSerializedSVG=function(A){return new Promise(function(e,t){var r=new Image;r.onload=function(){return e(r)},r.onerror=t,r.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent((new XMLSerializer).serializeToString(A))})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.breakWords=e.fromCodePoint=e.toCodePoints=void 0;var r=t(46);Object.defineProperty(e,"toCodePoints",{enumerable:!0,get:function(){return r.toCodePoints}}),Object.defineProperty(e,"fromCodePoint",{enumerable:!0,get:function(){return r.fromCodePoint}});var n,o=((n=t(3))&&n.__esModule,t(18));e.breakWords=function(A,e){for(var t=(0,r.LineBreaker)(A,{lineBreak:e.style.lineBreak,wordBreak:e.style.overflowWrap===o.OVERFLOW_WRAP.BREAK_WORD?"break-word":e.style.wordBreak}),n=[],s=void 0;!(s=t.next()).done;)n.push(s.value.slice());return n}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.FontMetrics=void 0;var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(4);e.FontMetrics=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this._data={},this._document=e}return r(A,[{key:"_parseMetrics",value:function(A){var e=this._document.createElement("div"),t=this._document.createElement("img"),r=this._document.createElement("span"),o=this._document.body;if(!o)throw new Error("");e.style.visibility="hidden",e.style.fontFamily=A.fontFamily,e.style.fontSize=A.fontSize,e.style.margin="0",e.style.padding="0",o.appendChild(e),t.src=n.SMALL_IMAGE,t.width=1,t.height=1,t.style.margin="0",t.style.padding="0",t.style.verticalAlign="baseline",r.style.fontFamily=A.fontFamily,r.style.fontSize=A.fontSize,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode("Hidden Text")),e.appendChild(r),e.appendChild(t);var s=t.offsetTop-r.offsetTop+2;e.removeChild(r),e.appendChild(this._document.createTextNode("Hidden Text")),e.style.lineHeight="normal",t.style.verticalAlign="super";var a=t.offsetTop-e.offsetTop+2;return o.removeChild(e),{baseline:s,middle:a}}},{key:"getMetrics",value:function(A){var e=A.fontFamily+" "+A.fontSize;return void 0===this._data[e]&&(this._data[e]=this._parseMetrics(A)),this._data[e]}}]),A}()},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.Proxy=void 0;var r,n=(r=t(10))&&r.__esModule?r:{default:r};e.Proxy=function(A,e){if(!e.proxy)return Promise.reject(null);var t=e.proxy;return new Promise(function(r,o){var s=n.default.SUPPORT_CORS_XHR&&n.default.SUPPORT_RESPONSE_TYPE?"blob":"text",a=n.default.SUPPORT_CORS_XHR?new XMLHttpRequest:new XDomainRequest;if(a.onload=function(){if(a instanceof XMLHttpRequest)if(200===a.status)if("text"===s)r(a.response);else{var A=new FileReader;A.addEventListener("load",function(){return r(A.result)},!1),A.addEventListener("error",function(A){return o(A)},!1),A.readAsDataURL(a.response)}else o("");else r(a.responseText)},a.onerror=o,a.open("GET",t+"?url="+encodeURIComponent(A)+"&responseType="+s),"text"!==s&&a instanceof XMLHttpRequest&&(a.responseType=s),e.imageTimeout){var i=e.imageTimeout;a.timeout=i,a.ontimeout=function(){return o("")}}a.send()})}},function(A,e,t){var r=Object.assign||function(A){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(A[r]=t[r])}return A},n=a(t(15)),o=a(t(16)),s=t(28);function a(A){return A&&A.__esModule?A:{default:A}}var i=function(A,e){var t=e||{},a=new o.default("boolean"!=typeof t.logging||t.logging);a.log("html2canvas 1.0.0-alpha.11");var i=A.ownerDocument;if(!i)return Promise.reject("Provided element is not within a Document");var B=i.defaultView,l={async:!0,allowTaint:!1,backgroundColor:"#ffffff",imageTimeout:15e3,logging:!0,proxy:null,removeContainer:!0,foreignObjectRendering:!1,scale:B.devicePixelRatio||1,target:new n.default(t.canvas),useCORS:!1,windowWidth:B.innerWidth,windowHeight:B.innerHeight,scrollX:B.pageXOffset,scrollY:B.pageYOffset};return(0,s.renderElement)(A,r({},l,t),a)};i.CanvasRenderer=n.default,A.exports=i},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.renderElement=void 0;var r=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},n=(d(t(16)),t(29)),o=d(t(51)),s=d(t(23)),a=d(t(10)),i=t(2),B=t(54),l=t(25),c=t(0),u=d(c);function d(A){return A&&A.__esModule?A:{default:A}}e.renderElement=function A(e,t,d){var w=e.ownerDocument,Q=new i.Bounds(t.scrollX,t.scrollY,t.windowWidth,t.windowHeight),g=w.documentElement?new u.default(getComputedStyle(w.documentElement).backgroundColor):c.TRANSPARENT,h=w.body?new u.default(getComputedStyle(w.body).backgroundColor):c.TRANSPARENT,f=e===w.documentElement?g.isTransparent()?h.isTransparent()?t.backgroundColor?new u.default(t.backgroundColor):null:h:g:t.backgroundColor?new u.default(t.backgroundColor):null;return(t.foreignObjectRendering?a.default.SUPPORT_FOREIGNOBJECT_DRAWING:Promise.resolve(!1)).then(function(a){return a?(u=new B.DocumentCloner(e,t,d,!0,A)).inlineFonts(w).then(function(){return u.resourceLoader.ready()}).then(function(){var A=new s.default(u.documentElement),r=w.defaultView,n=r.pageXOffset,o=r.pageYOffset,a="HTML"===e.tagName||"BODY"===e.tagName?(0,i.parseDocumentSize)(w):(0,i.parseBounds)(e,n,o),B=a.width,l=a.height,c=a.left,Q=a.top;return A.render({backgroundColor:f,logger:d,scale:t.scale,x:"number"==typeof t.x?t.x:c,y:"number"==typeof t.y?t.y:Q,width:"number"==typeof t.width?t.width:Math.ceil(B),height:"number"==typeof t.height?t.height:Math.ceil(l),windowWidth:t.windowWidth,windowHeight:t.windowHeight,scrollX:t.scrollX,scrollY:t.scrollY})}):(0,B.cloneWindow)(w,Q,e,t,d,A).then(function(A){var e=r(A,3),s=e[0],a=e[1],B=e[2],u=(0,n.NodeParser)(a,B,d),Q=a.ownerDocument;return f===u.container.style.background.backgroundColor&&(u.container.style.background.backgroundColor=c.TRANSPARENT),B.ready().then(function(A){var e=new l.FontMetrics(Q),r=Q.defaultView,n=r.pageXOffset,B=r.pageYOffset,c="HTML"===a.tagName||"BODY"===a.tagName?(0,i.parseDocumentSize)(w):(0,i.parseBounds)(a,n,B),g=c.width,h=c.height,U=c.left,C=c.top,E={backgroundColor:f,fontMetrics:e,imageStore:A,logger:d,scale:t.scale,x:"number"==typeof t.x?t.x:U,y:"number"==typeof t.y?t.y:C,width:"number"==typeof t.width?t.width:Math.ceil(g),height:"number"==typeof t.height?t.height:Math.ceil(h)};if(Array.isArray(t.target))return Promise.all(t.target.map(function(A){return new o.default(A,E).render(u)}));var F=new o.default(t.target,E).render(u);return!0===t.removeContainer&&s.parentNode&&s.parentNode.removeChild(s),F})});var u})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.NodeParser=void 0;var r=B(t(30)),n=B(t(3)),o=B(t(9)),s=t(21),a=t(14),i=t(8);function B(A){return A&&A.__esModule?A:{default:A}}e.NodeParser=function(A,e,t){var o=0,s=new n.default(A,null,e,o++),a=new r.default(s,null,!0);return c(A,s,a,e,o),a};var l=["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"],c=function A(e,t,B,c,w){for(var Q,g=e.firstChild;g;g=Q){Q=g.nextSibling;var h=g.ownerDocument.defaultView;if(g instanceof h.Text||g instanceof Text||h.parent&&g instanceof h.parent.Text)g.data.trim().length>0&&t.childNodes.push(o.default.fromTextNode(g,t));else if(g instanceof h.HTMLElement||g instanceof HTMLElement||h.parent&&g instanceof h.parent.HTMLElement){if(-1===l.indexOf(g.nodeName)){var f=new n.default(g,t,c,w++);if(f.isVisible()){"INPUT"===g.tagName?(0,s.inlineInputElement)(g,f):"TEXTAREA"===g.tagName?(0,s.inlineTextAreaElement)(g,f):"SELECT"===g.tagName?(0,s.inlineSelectElement)(g,f):f.style.listStyle&&f.style.listStyle.listStyleType!==i.LIST_STYLE_TYPE.NONE&&(0,a.inlineListItemElement)(g,f,c);var U="TEXTAREA"!==g.tagName,C=u(f,g);if(C||d(f)){var E=C||f.isPositioned()?B.getRealParentStackingContext():B,F=new r.default(f,E,C);E.contexts.push(F),U&&A(g,f,F,c,w)}else B.children.push(f),U&&A(g,f,B,c,w)}}}else if(g instanceof h.SVGSVGElement||g instanceof SVGSVGElement||h.parent&&g instanceof h.parent.SVGSVGElement){var p=new n.default(g,t,c,w++),H=u(p,g);if(H||d(p)){var m=H||p.isPositioned()?B.getRealParentStackingContext():B,v=new r.default(p,m,H);m.contexts.push(v)}else B.children.push(p)}}},u=function(A,e){return A.isRootElement()||A.isPositionedWithZIndex()||A.style.opacity<1||A.isTransformed()||w(A,e)},d=function(A){return A.isPositioned()||A.isFloating()},w=function(A,e){return"BODY"===e.nodeName&&A.parent instanceof n.default&&A.parent.style.background.backgroundColor.isTransparent()}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}();(r=t(3))&&r.__esModule,t(19);var o=function(){function A(e,t,r){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.container=e,this.parent=t,this.contexts=[],this.children=[],this.treatAsRealStackingContext=r}return n(A,[{key:"getOpacity",value:function(){return this.parent?this.container.style.opacity*this.parent.getOpacity():this.container.style.opacity}},{key:"getRealParentStackingContext",value:function(){return!this.parent||this.treatAsRealStackingContext?this:this.parent.getRealParentStackingContext()}}]),A}();e.default=o},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.width=e,this.height=t}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),o=t(6),s=(r=t(7))&&r.__esModule?r:{default:r},a=function(A,e,t){return new s.default(A.x+(e.x-A.x)*t,A.y+(e.y-A.y)*t)},i=function(){function A(e,t,r,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type=o.PATH.BEZIER_CURVE,this.start=e,this.startControl=t,this.endControl=r,this.end=n}return n(A,[{key:"subdivide",value:function(e,t){var r=a(this.start,this.startControl,e),n=a(this.startControl,this.endControl,e),o=a(this.endControl,this.end,e),s=a(r,n,e),i=a(n,o,e),B=a(s,i,e);return t?new A(this.start,r,s,B):new A(B,i,o,this.end)}},{key:"reverse",value:function(){return new A(this.end,this.endControl,this.startControl,this.start)}}]),A}();e.default=i},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseBorderRadius=void 0;var r,n=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},o=(r=t(1))&&r.__esModule?r:{default:r},s=["top-left","top-right","bottom-right","bottom-left"];e.parseBorderRadius=function(A){return s.map(function(e){var t=A.getPropertyValue("border-"+e+"-radius").split(" ").map(o.default.create),r=n(t,2),s=r[0],a=r[1];return void 0===a?[s,s]:[s,a]})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.DISPLAY={NONE:1,BLOCK:2,INLINE:4,RUN_IN:8,FLOW:16,FLOW_ROOT:32,TABLE:64,FLEX:128,GRID:256,RUBY:512,SUBGRID:1024,LIST_ITEM:2048,TABLE_ROW_GROUP:4096,TABLE_HEADER_GROUP:8192,TABLE_FOOTER_GROUP:16384,TABLE_ROW:32768,TABLE_CELL:65536,TABLE_COLUMN_GROUP:1<<17,TABLE_COLUMN:1<<18,TABLE_CAPTION:1<<19,RUBY_BASE:1<<20,RUBY_TEXT:1<<21,RUBY_BASE_CONTAINER:1<<22,RUBY_TEXT_CONTAINER:1<<23,CONTENTS:1<<24,INLINE_BLOCK:1<<25,INLINE_LIST_ITEM:1<<26,INLINE_TABLE:1<<27,INLINE_FLEX:1<<28,INLINE_GRID:1<<29},n=function(A,e){return A|function(A){switch(e){case"block":return r.BLOCK;case"inline":return r.INLINE;case"run-in":return r.RUN_IN;case"flow":return r.FLOW;case"flow-root":return r.FLOW_ROOT;case"table":return r.TABLE;case"flex":return r.FLEX;case"grid":return r.GRID;case"ruby":return r.RUBY;case"subgrid":return r.SUBGRID;case"list-item":return r.LIST_ITEM;case"table-row-group":return r.TABLE_ROW_GROUP;case"table-header-group":return r.TABLE_HEADER_GROUP;case"table-footer-group":return r.TABLE_FOOTER_GROUP;case"table-row":return r.TABLE_ROW;case"table-cell":return r.TABLE_CELL;case"table-column-group":return r.TABLE_COLUMN_GROUP;case"table-column":return r.TABLE_COLUMN;case"table-caption":return r.TABLE_CAPTION;case"ruby-base":return r.RUBY_BASE;case"ruby-text":return r.RUBY_TEXT;case"ruby-base-container":return r.RUBY_BASE_CONTAINER;case"ruby-text-container":return r.RUBY_TEXT_CONTAINER;case"contents":return r.CONTENTS;case"inline-block":return r.INLINE_BLOCK;case"inline-list-item":return r.INLINE_LIST_ITEM;case"inline-table":return r.INLINE_TABLE;case"inline-flex":return r.INLINE_FLEX;case"inline-grid":return r.INLINE_GRID}return r.NONE}()};e.parseDisplay=function(A){return A.split(" ").reduce(n,0)}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.FLOAT={NONE:0,LEFT:1,RIGHT:2,INLINE_START:3,INLINE_END:4};e.parseCSSFloat=function(A){switch(A){case"left":return r.LEFT;case"right":return r.RIGHT;case"inline-start":return r.INLINE_START;case"inline-end":return r.INLINE_END}return r.NONE}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseFont=function(A){return{fontFamily:A.fontFamily,fontSize:A.fontSize,fontStyle:A.fontStyle,fontVariant:A.fontVariant,fontWeight:function(A){switch(A){case"normal":return 400;case"bold":return 700}var e=parseInt(A,10);return isNaN(e)?400:e}(A.fontWeight)}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseLetterSpacing=function(A){if("normal"===A)return 0;var e=parseFloat(A);return isNaN(e)?0:e}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.LINE_BREAK={NORMAL:"normal",STRICT:"strict"};e.parseLineBreak=function(A){switch(A){case"strict":return r.STRICT;case"normal":default:return r.NORMAL}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseMargin=void 0;var r,n=(r=t(1))&&r.__esModule?r:{default:r},o=["top","right","bottom","left"];e.parseMargin=function(A){return o.map(function(e){return new n.default(A.getPropertyValue("margin-"+e))})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.OVERFLOW={VISIBLE:0,HIDDEN:1,SCROLL:2,AUTO:3};e.parseOverflow=function(A){switch(A){case"hidden":return r.HIDDEN;case"scroll":return r.SCROLL;case"auto":return r.AUTO;case"visible":default:return r.VISIBLE}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseTextShadow=void 0;var r,n=(r=t(0))&&r.__esModule?r:{default:r},o=/^([+-]|\d|\.)$/i;e.parseTextShadow=function(A){if("none"===A||"string"!=typeof A)return null;for(var e="",t=!1,r=[],s=[],a=0,i=null,B=function(){e.length&&(t?r.push(parseFloat(e)):i=new n.default(e)),t=!1,e=""},l=function(){r.length&&null!==i&&s.push({color:i,offsetX:r[0]||0,offsetY:r[1]||0,blur:r[2]||0}),r.splice(0,r.length),i=null},c=0;c<A.length;c++){var u=A[c];switch(u){case"(":e+=u,a++;break;case")":e+=u,a--;break;case",":0===a?(B(),l()):e+=u;break;case" ":0===a?B():e+=u;break;default:0===e.length&&o.test(u)&&(t=!0),e+=u}}return B(),l(),0===s.length?null:s}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseTransform=void 0;var r,n=(r=t(1))&&r.__esModule?r:{default:r},o=function(A){return parseFloat(A.trim())},s=/(matrix|matrix3d)\((.+)\)/,a=(e.parseTransform=function(A){var e=i(A.transform||A.webkitTransform||A.mozTransform||A.msTransform||A.oTransform);return null===e?null:{transform:e,transformOrigin:a(A.transformOrigin||A.webkitTransformOrigin||A.mozTransformOrigin||A.msTransformOrigin||A.oTransformOrigin)}},function(A){if("string"!=typeof A){var e=new n.default("0");return[e,e]}var t=A.split(" ").map(n.default.create);return[t[0],t[1]]}),i=function(A){if("none"===A||"string"!=typeof A)return null;var e=A.match(s);if(e){if("matrix"===e[1]){var t=e[2].split(",").map(o);return[t[0],t[1],t[2],t[3],t[4],t[5]]}var r=e[2].split(",").map(o);return[r[0],r[1],r[4],r[5],r[12],r[13]]}return null}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.VISIBILITY={VISIBLE:0,HIDDEN:1,COLLAPSE:2};e.parseVisibility=function(A){switch(A){case"hidden":return r.HIDDEN;case"collapse":return r.COLLAPSE;case"visible":default:return r.VISIBLE}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=e.WORD_BREAK={NORMAL:"normal",BREAK_ALL:"break-all",KEEP_ALL:"keep-all"};e.parseWordBreak=function(A){switch(A){case"break-all":return r.BREAK_ALL;case"keep-all":return r.KEEP_ALL;case"normal":default:return r.NORMAL}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseZIndex=function(A){var e="auto"===A;return{auto:e,order:e?0:parseInt(A,10)}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=t(13);Object.defineProperty(e,"toCodePoints",{enumerable:!0,get:function(){return r.toCodePoints}}),Object.defineProperty(e,"fromCodePoint",{enumerable:!0,get:function(){return r.fromCodePoint}});var n=t(47);Object.defineProperty(e,"LineBreaker",{enumerable:!0,get:function(){return n.LineBreaker}})},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.LineBreaker=e.inlineBreakOpportunities=e.lineBreakAtIndex=e.codePointsToCharacterClasses=e.UnicodeTrie=e.BREAK_ALLOWED=e.BREAK_NOT_ALLOWED=e.BREAK_MANDATORY=e.classes=e.LETTER_NUMBER_MODIFIER=void 0;var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),o=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},s=t(48),a=(r=t(49))&&r.__esModule?r:{default:r},i=t(13),B=e.LETTER_NUMBER_MODIFIER=50,l=10,c=13,u=15,d=17,w=18,Q=19,g=20,h=21,f=22,U=24,C=25,E=26,F=27,p=28,H=30,m=32,v=33,b=34,I=35,T=37,N=38,y=39,K=40,S=42,L=(e.classes={BK:1,CR:2,LF:3,CM:4,NL:5,SG:6,WJ:7,ZW:8,GL:9,SP:l,ZWJ:11,B2:12,BA:c,BB:14,HY:u,CB:16,CL:d,CP:w,EX:Q,IN:g,NS:h,OP:f,QU:23,IS:U,NU:C,PO:E,PR:F,SY:p,AI:29,AL:H,CJ:31,EB:m,EM:v,H2:b,H3:I,HL:36,ID:T,JL:N,JV:y,JT:K,RI:41,SA:S,XX:43},e.BREAK_MANDATORY="!"),M=e.BREAK_NOT_ALLOWED="×",D=e.BREAK_ALLOWED="÷",O=e.UnicodeTrie=(0,s.createTrieFromBase64)(a.default),_=[H,36],R=[1,2,3,5],P=[l,8],k=[F,E],x=R.concat(P),X=[N,y,K,b,I],z=[u,c],V=e.codePointsToCharacterClasses=function(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"strict",t=[],r=[],n=[];return A.forEach(function(A,o){var s=O.get(A);if(s>B?(n.push(!0),s-=B):n.push(!1),-1!==["normal","auto","loose"].indexOf(e)&&-1!==[8208,8211,12316,12448].indexOf(A))return r.push(o),t.push(16);if(4===s||11===s){if(0===o)return r.push(o),t.push(H);var a=t[o-1];return-1===x.indexOf(a)?(r.push(r[o-1]),t.push(a)):(r.push(o),t.push(H))}return r.push(o),31===s?t.push("strict"===e?h:T):s===S?t.push(H):29===s?t.push(H):43===s?A>=131072&&A<=196605||A>=196608&&A<=262141?t.push(T):t.push(H):void t.push(s)}),[r,t,n]},Y=function(A,e,t,r){var n=r[t];if(Array.isArray(A)?-1!==A.indexOf(n):A===n)for(var o=t;o<=r.length;){var s=r[++o];if(s===e)return!0;if(s!==l)break}if(n===l)for(var a=t;a>0;){var i=r[--a];if(Array.isArray(A)?-1!==A.indexOf(i):A===i)for(var B=t;B<=r.length;){var c=r[++B];if(c===e)return!0;if(c!==l)break}if(i!==l)break}return!1},G=function(A,e){for(var t=A;t>=0;){var r=e[t];if(r!==l)return r;t--}return 0},J=function(A,e,t,r,n){if(0===t[r])return M;var o=r-1;if(Array.isArray(n)&&!0===n[o])return M;var s=o-1,a=o+1,i=e[o],B=s>=0?e[s]:0,H=e[a];if(2===i&&3===H)return M;if(-1!==R.indexOf(i))return L;if(-1!==R.indexOf(H))return M;if(-1!==P.indexOf(H))return M;if(8===G(o,e))return D;if(11===O.get(A[o])&&(H===T||H===m||H===v))return M;if(7===i||7===H)return M;if(9===i)return M;if(-1===[l,c,u].indexOf(i)&&9===H)return M;if(-1!==[d,w,Q,U,p].indexOf(H))return M;if(G(o,e)===f)return M;if(Y(23,f,o,e))return M;if(Y([d,w],h,o,e))return M;if(Y(12,12,o,e))return M;if(i===l)return D;if(23===i||23===H)return M;if(16===H||16===i)return D;if(-1!==[c,u,h].indexOf(H)||14===i)return M;if(36===B&&-1!==z.indexOf(i))return M;if(i===p&&36===H)return M;if(H===g&&-1!==_.concat(g,Q,C,T,m,v).indexOf(i))return M;if(-1!==_.indexOf(H)&&i===C||-1!==_.indexOf(i)&&H===C)return M;if(i===F&&-1!==[T,m,v].indexOf(H)||-1!==[T,m,v].indexOf(i)&&H===E)return M;if(-1!==_.indexOf(i)&&-1!==k.indexOf(H)||-1!==k.indexOf(i)&&-1!==_.indexOf(H))return M;if(-1!==[F,E].indexOf(i)&&(H===C||-1!==[f,u].indexOf(H)&&e[a+1]===C)||-1!==[f,u].indexOf(i)&&H===C||i===C&&-1!==[C,p,U].indexOf(H))return M;if(-1!==[C,p,U,d,w].indexOf(H))for(var S=o;S>=0;){var x=e[S];if(x===C)return M;if(-1===[p,U].indexOf(x))break;S--}if(-1!==[F,E].indexOf(H))for(var V=-1!==[d,w].indexOf(i)?s:o;V>=0;){var J=e[V];if(J===C)return M;if(-1===[p,U].indexOf(J))break;V--}if(N===i&&-1!==[N,y,b,I].indexOf(H)||-1!==[y,b].indexOf(i)&&-1!==[y,K].indexOf(H)||-1!==[K,I].indexOf(i)&&H===K)return M;if(-1!==X.indexOf(i)&&-1!==[g,E].indexOf(H)||-1!==X.indexOf(H)&&i===F)return M;if(-1!==_.indexOf(i)&&-1!==_.indexOf(H))return M;if(i===U&&-1!==_.indexOf(H))return M;if(-1!==_.concat(C).indexOf(i)&&H===f||-1!==_.concat(C).indexOf(H)&&i===w)return M;if(41===i&&41===H){for(var W=t[o],j=1;W>0&&41===e[--W];)j++;if(j%2!=0)return M}return i===m&&H===v?M:D},W=(e.lineBreakAtIndex=function(A,e){if(0===e)return M;if(e>=A.length)return L;var t=V(A),r=o(t,2),n=r[0],s=r[1];return J(A,s,n,e)},function(A,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var t=V(A,e.lineBreak),r=o(t,3),n=r[0],s=r[1],a=r[2];return"break-all"!==e.wordBreak&&"break-word"!==e.wordBreak||(s=s.map(function(A){return-1!==[C,H,S].indexOf(A)?T:A})),[n,s,"keep-all"===e.wordBreak?a.map(function(e,t){return e&&A[t]>=19968&&A[t]<=40959}):null]}),j=(e.inlineBreakOpportunities=function(A,e){var t=(0,i.toCodePoints)(A),r=M,n=W(t,e),s=o(n,3),a=s[0],B=s[1],l=s[2];return t.forEach(function(A,e){r+=(0,i.fromCodePoint)(A)+(e>=t.length-1?L:J(t,B,a,e+1,l))}),r},function(){function A(e,t,r,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this._codePoints=e,this.required=t===L,this.start=r,this.end=n}return n(A,[{key:"slice",value:function(){return i.fromCodePoint.apply(void 0,function(A){if(Array.isArray(A)){for(var e=0,t=Array(A.length);e<A.length;e++)t[e]=A[e];return t}return Array.from(A)}(this._codePoints.slice(this.start,this.end)))}}]),A}());e.LineBreaker=function(A,e){var t=(0,i.toCodePoints)(A),r=W(t,e),n=o(r,3),s=n[0],a=n[1],B=n[2],l=t.length,c=0,u=0;return{next:function(){if(u>=l)return{done:!0};for(var A=M;u<l&&(A=J(t,a,s,++u,B))===M;);if(A!==M||u===l){var e=new j(t,A,c,u);return c=u,{value:e,done:!1}}return{done:!0}}}}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.Trie=e.createTrieFromBase64=e.UTRIE2_INDEX_2_MASK=e.UTRIE2_INDEX_2_BLOCK_LENGTH=e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH=e.UTRIE2_INDEX_1_OFFSET=e.UTRIE2_UTF8_2B_INDEX_2_LENGTH=e.UTRIE2_UTF8_2B_INDEX_2_OFFSET=e.UTRIE2_INDEX_2_BMP_LENGTH=e.UTRIE2_LSCP_INDEX_2_LENGTH=e.UTRIE2_DATA_MASK=e.UTRIE2_DATA_BLOCK_LENGTH=e.UTRIE2_LSCP_INDEX_2_OFFSET=e.UTRIE2_SHIFT_1_2=e.UTRIE2_INDEX_SHIFT=e.UTRIE2_SHIFT_1=e.UTRIE2_SHIFT_2=void 0;var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(13),o=e.UTRIE2_SHIFT_2=5,s=e.UTRIE2_SHIFT_1=11,a=e.UTRIE2_INDEX_SHIFT=2,i=e.UTRIE2_SHIFT_1_2=s-o,B=e.UTRIE2_LSCP_INDEX_2_OFFSET=65536>>o,l=e.UTRIE2_DATA_BLOCK_LENGTH=1<<o,c=e.UTRIE2_DATA_MASK=l-1,u=e.UTRIE2_LSCP_INDEX_2_LENGTH=1024>>o,d=e.UTRIE2_INDEX_2_BMP_LENGTH=B+u,w=e.UTRIE2_UTF8_2B_INDEX_2_OFFSET=d,Q=e.UTRIE2_UTF8_2B_INDEX_2_LENGTH=32,g=e.UTRIE2_INDEX_1_OFFSET=w+Q,h=e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH=65536>>s,f=e.UTRIE2_INDEX_2_BLOCK_LENGTH=1<<i,U=e.UTRIE2_INDEX_2_MASK=f-1,C=(e.createTrieFromBase64=function(A){var e=(0,n.decode)(A),t=Array.isArray(e)?(0,n.polyUint32Array)(e):new Uint32Array(e),r=Array.isArray(e)?(0,n.polyUint16Array)(e):new Uint16Array(e),o=r.slice(12,t[4]/2),s=2===t[5]?r.slice((24+t[4])/2):t.slice(Math.ceil((24+t[4])/4));return new C(t[0],t[1],t[2],t[3],o,s)},e.Trie=function(){function A(e,t,r,n,o,s){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.initialValue=e,this.errorValue=t,this.highStart=r,this.highValueIndex=n,this.index=o,this.data=s}return r(A,[{key:"get",value:function(A){var e=void 0;if(A>=0){if(A<55296||A>56319&&A<=65535)return e=((e=this.index[A>>o])<<a)+(A&c),this.data[e];if(A<=65535)return e=((e=this.index[B+(A-55296>>o)])<<a)+(A&c),this.data[e];if(A<this.highStart)return e=g-h+(A>>s),e=this.index[e],e+=A>>o&U,e=((e=this.index[e])<<a)+(A&c),this.data[e];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue}}]),A}())},function(A,e,t){A.exports="KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA"},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=t(6);e.default=function A(e,t,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type=r.PATH.CIRCLE,this.x=e,this.y=t,this.radius=n}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},o=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),s=t(2),a=(t(25),t(52)),i=(r=t(9))&&r.__esModule?r:{default:r},B=t(5),l=t(12),c=function(){function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.target=e,this.options=t,e.render(t)}return o(A,[{key:"renderNode",value:function(A){A.isVisible()&&(this.renderNodeBackgroundAndBorders(A),this.renderNodeContent(A))}},{key:"renderNodeContent",value:function(A){var e=this,t=function(){if(A.childNodes.length&&A.childNodes.forEach(function(t){if(t instanceof i.default){var r=t.parent.style;e.target.renderTextNode(t.bounds,r.color,r.font,r.textDecoration,r.textShadow)}else e.target.drawShape(t,A.style.color)}),A.image){var t=e.options.imageStore.get(A.image);if(t){var r=(0,s.calculateContentBox)(A.bounds,A.style.padding,A.style.border),n="number"==typeof t.width&&t.width>0?t.width:r.width,o="number"==typeof t.height&&t.height>0?t.height:r.height;n>0&&o>0&&e.target.clip([(0,s.calculatePaddingBoxPath)(A.curvedBounds)],function(){e.target.drawImage(t,new s.Bounds(0,0,n,o),r)})}}},r=A.getClipPaths();r.length?this.target.clip(r,t):t()}},{key:"renderNodeBackgroundAndBorders",value:function(A){var e=this,t=!A.style.background.backgroundColor.isTransparent()||A.style.background.backgroundImage.length,r=A.style.border.some(function(A){return A.borderStyle!==l.BORDER_STYLE.NONE&&!A.borderColor.isTransparent()}),n=function(){var r=(0,B.calculateBackgroungPaintingArea)(A.curvedBounds,A.style.background.backgroundClip);t&&e.target.clip([r],function(){A.style.background.backgroundColor.isTransparent()||e.target.fill(A.style.background.backgroundColor),e.renderBackgroundImage(A)}),A.style.border.forEach(function(t,r){t.borderStyle===l.BORDER_STYLE.NONE||t.borderColor.isTransparent()||e.renderBorder(t,r,A.curvedBounds)})};if(t||r){var o=A.parent?A.parent.getClipPaths():[];o.length?this.target.clip(o,n):n()}}},{key:"renderBackgroundImage",value:function(A){var e=this;A.style.background.backgroundImage.slice(0).reverse().forEach(function(t){"url"===t.source.method&&t.source.args.length?e.renderBackgroundRepeat(A,t):/gradient/i.test(t.source.method)&&e.renderBackgroundGradient(A,t)})}},{key:"renderBackgroundRepeat",value:function(A,e){var t=this.options.imageStore.get(e.source.args[0]);if(t){var r=(0,B.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin,A.bounds,A.style.padding,A.style.border),n=(0,B.calculateBackgroundSize)(e,t,r),o=(0,B.calculateBackgroundPosition)(e.position,n,r),s=(0,B.calculateBackgroundRepeatPath)(e,o,n,r,A.bounds),a=Math.round(r.left+o.x),i=Math.round(r.top+o.y);this.target.renderRepeat(s,t,n,a,i)}}},{key:"renderBackgroundGradient",value:function(A,e){var t=(0,B.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin,A.bounds,A.style.padding,A.style.border),r=(0,B.calculateGradientBackgroundSize)(e,t),n=(0,B.calculateBackgroundPosition)(e.position,r,t),o=new s.Bounds(Math.round(t.left+n.x),Math.round(t.top+n.y),r.width,r.height),i=(0,a.parseGradient)(A,e.source,o);if(i)switch(i.type){case a.GRADIENT_TYPE.LINEAR_GRADIENT:this.target.renderLinearGradient(o,i);break;case a.GRADIENT_TYPE.RADIAL_GRADIENT:this.target.renderRadialGradient(o,i)}}},{key:"renderBorder",value:function(A,e,t){this.target.drawShape((0,s.parsePathForBorder)(t,e),A.borderColor)}},{key:"renderStack",value:function(A){var e=this;if(A.container.isVisible()){var t=A.getOpacity();t!==this._opacity&&(this.target.setOpacity(A.getOpacity()),this._opacity=t);var r=A.container.style.transform;null!==r?this.target.transform(A.container.bounds.left+r.transformOrigin[0].value,A.container.bounds.top+r.transformOrigin[1].value,r.transform,function(){return e.renderStackContent(A)}):this.renderStackContent(A)}}},{key:"renderStackContent",value:function(A){var e=d(A),t=n(e,5),r=t[0],o=t[1],s=t[2],a=t[3],i=t[4],B=u(A),l=n(B,2),c=l[0],Q=l[1];this.renderNodeBackgroundAndBorders(A.container),r.sort(w).forEach(this.renderStack,this),this.renderNodeContent(A.container),Q.forEach(this.renderNode,this),a.forEach(this.renderStack,this),i.forEach(this.renderStack,this),c.forEach(this.renderNode,this),o.forEach(this.renderStack,this),s.sort(w).forEach(this.renderStack,this)}},{key:"render",value:function(A){return this.options.backgroundColor&&this.target.rectangle(this.options.x,this.options.y,this.options.width,this.options.height,this.options.backgroundColor),this.renderStack(A),this.target.getTarget()}}]),A}();e.default=c;var u=function(A){for(var e=[],t=[],r=A.children.length,n=0;n<r;n++){var o=A.children[n];o.isInlineLevel()?e.push(o):t.push(o)}return[e,t]},d=function(A){for(var e=[],t=[],r=[],n=[],o=[],s=A.contexts.length,a=0;a<s;a++){var i=A.contexts[a];i.container.isPositioned()||i.container.style.opacity<1||i.container.isTransformed()?i.container.style.zIndex.order<0?e.push(i):i.container.style.zIndex.order>0?r.push(i):t.push(i):i.container.isFloating()?n.push(i):o.push(i)}return[e,t,r,n,o]},w=function(A,e){return A.container.style.zIndex.order>e.container.style.zIndex.order?1:A.container.style.zIndex.order<e.container.style.zIndex.order?-1:A.container.index>e.container.index?1:-1}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.transformWebkitRadialGradientArgs=e.parseGradient=e.RadialGradient=e.LinearGradient=e.RADIAL_GRADIENT_SHAPE=e.GRADIENT_TYPE=void 0;var r=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},n=(B(t(3)),t(53)),o=B(t(0)),s=t(1),a=B(s),i=t(4);function B(A){return A&&A.__esModule?A:{default:A}}function l(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}var c=/^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i,u=/^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i,d=/(px)|%|( 0)$/i,w=/^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i,Q=/^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i,g=e.GRADIENT_TYPE={LINEAR_GRADIENT:0,RADIAL_GRADIENT:1},h=e.RADIAL_GRADIENT_SHAPE={CIRCLE:0,ELLIPSE:1},f={left:new a.default("0%"),top:new a.default("0%"),center:new a.default("50%"),right:new a.default("100%"),bottom:new a.default("100%")},U=e.LinearGradient=function A(e,t){l(this,A),this.type=g.LINEAR_GRADIENT,this.colorStops=e,this.direction=t},C=e.RadialGradient=function A(e,t,r,n){l(this,A),this.type=g.RADIAL_GRADIENT,this.colorStops=e,this.shape=t,this.center=r,this.radius=n},E=(e.parseGradient=function(A,e,t){var r=e.args,n=e.method,o=e.prefix;return"linear-gradient"===n?F(r,t,!!o):"gradient"===n&&"linear"===r[0]?F(["to bottom"].concat(y(r.slice(3))),t,!!o):"radial-gradient"===n?p(A,"-webkit-"===o?N(r):r,t):"gradient"===n&&"radial"===r[0]?p(A,y(N(r.slice(1))),t):void 0},function(A,e,t){for(var r=[],n=e;n<A.length;n++){var s=A[n],i=d.test(s),B=s.lastIndexOf(" "),l=new o.default(i?s.substring(0,B):s),c=i?new a.default(s.substring(B+1)):n===e?new a.default("0%"):n===A.length-1?new a.default("100%"):null;r.push({color:l,stop:c})}for(var u=r.map(function(A){var e=A.color,r=A.stop;return{color:e,stop:0===t?0:r?r.getAbsoluteValue(t)/t:null}}),w=u[0].stop,Q=0;Q<u.length;Q++)if(null!==w){var g=u[Q].stop;if(null===g){for(var h=Q;null===u[h].stop;)h++;for(var f=h-Q+1,U=(u[h].stop-w)/f;Q<h;Q++)w=u[Q].stop=w+U}else w=g}return u}),F=function(A,e,t){var r=(0,n.parseAngle)(A[0]),o=c.test(A[0]),s=o||null!==r||u.test(A[0]),a=s?null!==r?H(t?r-.5*Math.PI:r,e):o?v(A[0],e):b(A[0],e):H(Math.PI,e),B=s?1:0,l=Math.min((0,i.distance)(Math.abs(a.x0)+Math.abs(a.x1),Math.abs(a.y0)+Math.abs(a.y1)),2*e.width,2*e.height);return new U(E(A,B,l),a)},p=function(A,e,t){var r=e[0].match(Q),n=r&&("circle"===r[1]||void 0!==r[3]&&void 0===r[5])?h.CIRCLE:h.ELLIPSE,o={},a={};r&&(void 0!==r[3]&&(o.x=(0,s.calculateLengthFromValueWithUnit)(A,r[3],r[4]).getAbsoluteValue(t.width)),void 0!==r[5]&&(o.y=(0,s.calculateLengthFromValueWithUnit)(A,r[5],r[6]).getAbsoluteValue(t.height)),r[7]?a.x=f[r[7].toLowerCase()]:void 0!==r[8]&&(a.x=(0,s.calculateLengthFromValueWithUnit)(A,r[8],r[9])),r[10]?a.y=f[r[10].toLowerCase()]:void 0!==r[11]&&(a.y=(0,s.calculateLengthFromValueWithUnit)(A,r[11],r[12])));var i={x:void 0===a.x?t.width/2:a.x.getAbsoluteValue(t.width),y:void 0===a.y?t.height/2:a.y.getAbsoluteValue(t.height)},B=T(r&&r[2]||"farthest-corner",n,i,o,t);return new C(E(e,r?1:0,Math.min(B.x,B.y)),n,i,B)},H=function(A,e){var t=e.width,r=e.height,n=.5*t,o=.5*r,s=(Math.abs(t*Math.sin(A))+Math.abs(r*Math.cos(A)))/2,a=n+Math.sin(A)*s,i=o-Math.cos(A)*s;return{x0:a,x1:t-a,y0:i,y1:r-i}},m=function(A){return Math.acos(A.width/2/((0,i.distance)(A.width,A.height)/2))},v=function(A,e){switch(A){case"bottom":case"to top":return H(0,e);case"left":case"to right":return H(Math.PI/2,e);case"right":case"to left":return H(3*Math.PI/2,e);case"top right":case"right top":case"to bottom left":case"to left bottom":return H(Math.PI+m(e),e);case"top left":case"left top":case"to bottom right":case"to right bottom":return H(Math.PI-m(e),e);case"bottom left":case"left bottom":case"to top right":case"to right top":return H(m(e),e);case"bottom right":case"right bottom":case"to top left":case"to left top":return H(2*Math.PI-m(e),e);case"top":case"to bottom":default:return H(Math.PI,e)}},b=function(A,e){var t=A.split(" ").map(parseFloat),n=r(t,2),o=n[0],s=n[1],a=o/100*e.width/(s/100*e.height);return H(Math.atan(isNaN(a)?1:a)+Math.PI/2,e)},I=function(A,e,t,r){return[{x:0,y:0},{x:0,y:A.height},{x:A.width,y:0},{x:A.width,y:A.height}].reduce(function(A,n){var o=(0,i.distance)(e-n.x,t-n.y);return(r?o<A.optimumDistance:o>A.optimumDistance)?{optimumCorner:n,optimumDistance:o}:A},{optimumDistance:r?1/0:-1/0,optimumCorner:null}).optimumCorner},T=function(A,e,t,r,n){var o=t.x,s=t.y,a=0,B=0;switch(A){case"closest-side":e===h.CIRCLE?a=B=Math.min(Math.abs(o),Math.abs(o-n.width),Math.abs(s),Math.abs(s-n.height)):e===h.ELLIPSE&&(a=Math.min(Math.abs(o),Math.abs(o-n.width)),B=Math.min(Math.abs(s),Math.abs(s-n.height)));break;case"closest-corner":if(e===h.CIRCLE)a=B=Math.min((0,i.distance)(o,s),(0,i.distance)(o,s-n.height),(0,i.distance)(o-n.width,s),(0,i.distance)(o-n.width,s-n.height));else if(e===h.ELLIPSE){var l=Math.min(Math.abs(s),Math.abs(s-n.height))/Math.min(Math.abs(o),Math.abs(o-n.width)),c=I(n,o,s,!0);B=l*(a=(0,i.distance)(c.x-o,(c.y-s)/l))}break;case"farthest-side":e===h.CIRCLE?a=B=Math.max(Math.abs(o),Math.abs(o-n.width),Math.abs(s),Math.abs(s-n.height)):e===h.ELLIPSE&&(a=Math.max(Math.abs(o),Math.abs(o-n.width)),B=Math.max(Math.abs(s),Math.abs(s-n.height)));break;case"farthest-corner":if(e===h.CIRCLE)a=B=Math.max((0,i.distance)(o,s),(0,i.distance)(o,s-n.height),(0,i.distance)(o-n.width,s),(0,i.distance)(o-n.width,s-n.height));else if(e===h.ELLIPSE){var u=Math.max(Math.abs(s),Math.abs(s-n.height))/Math.max(Math.abs(o),Math.abs(o-n.width)),d=I(n,o,s,!1);B=u*(a=(0,i.distance)(d.x-o,(d.y-s)/u))}break;default:a=r.x||0,B=void 0!==r.y?r.y:a}return{x:a,y:B}},N=e.transformWebkitRadialGradientArgs=function(A){var e="",t="",r="",n="",o=0,s=/^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i,a=/^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i,i=A[o].match(s);i&&o++;var B=A[o].match(/^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i);B&&(e=B[1]||"","contain"===(r=B[2]||"")?r="closest-side":"cover"===r&&(r="farthest-corner"),o++);var l=A[o].match(a);l&&o++;var c=A[o].match(s);c&&o++;var u=A[o].match(a);u&&o++;var d=c||i;d&&d[1]&&(n=d[1]+(/^\d+$/.test(d[1])?"px":""),d[2]&&(n+=" "+d[2]+(/^\d+$/.test(d[2])?"px":"")));var w=u||l;return w&&(t=w[0],w[1]||(t+="px")),!n||e||t||r||(t=n,n=""),n&&(n="at "+n),[[e,r,t,n].filter(function(A){return!!A}).join(" ")].concat(A.slice(o))},y=function(A){return A.map(function(A){return A.match(w)}).map(function(e,t){if(!e)return A[t];switch(e[1]){case"from":return e[4]+" 0%";case"to":return e[4]+" 100%";case"color-stop":return"%"===e[3]?e[4]+" "+e[2]:e[4]+" "+100*parseFloat(e[2])+"%"}})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0});var r=/([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;e.parseAngle=function(A){var e=A.match(r);if(e){var t=parseFloat(e[1]);switch(e[2].toLowerCase()){case"deg":return Math.PI*t/180;case"grad":return Math.PI/200*t;case"rad":return t;case"turn":return 2*Math.PI*t}}return null}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.cloneWindow=e.DocumentCloner=void 0;var r=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),o=t(2),s=t(26),a=u(t(55)),i=t(4),B=t(5),l=u(t(15)),c=t(56);function u(A){return A&&A.__esModule?A:{default:A}}var d=e.DocumentCloner=function(){function A(e,t,r,n,o){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.referenceElement=e,this.scrolledElements=[],this.copyStyles=n,this.inlineImages=n,this.logger=r,this.options=t,this.renderer=o,this.resourceLoader=new a.default(t,r,window),this.pseudoContentData={counters:{},quoteDepth:0},this.documentElement=this.cloneNode(e.ownerDocument.documentElement)}return n(A,[{key:"inlineAllImages",value:function(A){var e=this;if(this.inlineImages&&A){var t=A.style;Promise.all((0,B.parseBackgroundImage)(t.backgroundImage).map(function(A){return"url"===A.method?e.resourceLoader.inlineImage(A.args[0]).then(function(A){return A&&"string"==typeof A.src?'url("'+A.src+'")':"none"}).catch(function(A){}):Promise.resolve(""+A.prefix+A.method+"("+A.args.join(",")+")")})).then(function(A){A.length>1&&(t.backgroundColor=""),t.backgroundImage=A.join(",")}),A instanceof HTMLImageElement&&this.resourceLoader.inlineImage(A.src).then(function(e){if(e&&A instanceof HTMLImageElement&&A.parentNode){var t=A.parentNode,r=(0,i.copyCSSStyles)(A.style,e.cloneNode(!1));t.replaceChild(r,A)}}).catch(function(A){})}}},{key:"inlineFonts",value:function(A){var e=this;return Promise.all(Array.from(A.styleSheets).map(function(e){return e.href?fetch(e.href).then(function(A){return A.text()}).then(function(A){return Q(A,e.href)}).catch(function(A){return[]}):w(e,A)})).then(function(A){return A.reduce(function(A,e){return A.concat(e)},[])}).then(function(A){return Promise.all(A.map(function(A){return fetch(A.formats[0].src).then(function(A){return A.blob()}).then(function(A){return new Promise(function(e,t){var r=new FileReader;r.onerror=t,r.onload=function(){var A=r.result;e(A)},r.readAsDataURL(A)})}).then(function(e){return A.fontFace.setProperty("src",'url("'+e+'")'),"@font-face {"+A.fontFace.cssText+" "})}))}).then(function(t){var r=A.createElement("style");r.textContent=t.join("\n"),e.documentElement.appendChild(r)})}},{key:"createElementClone",value:function(A){var e=this;if(this.copyStyles&&A instanceof HTMLCanvasElement){var t=A.ownerDocument.createElement("img");try{return t.src=A.toDataURL(),t}catch(A){}}if(A instanceof HTMLIFrameElement){var r=A.cloneNode(!1),n=m();r.setAttribute("data-html2canvas-internal-iframe-key",n);var s=(0,o.parseBounds)(A,0,0),a=s.width,B=s.height;return this.resourceLoader.cache[n]=b(A,this.options).then(function(A){return e.renderer(A,{async:e.options.async,allowTaint:e.options.allowTaint,backgroundColor:"#ffffff",canvas:null,imageTimeout:e.options.imageTimeout,logging:e.options.logging,proxy:e.options.proxy,removeContainer:e.options.removeContainer,scale:e.options.scale,foreignObjectRendering:e.options.foreignObjectRendering,useCORS:e.options.useCORS,target:new l.default,width:a,height:B,x:0,y:0,windowWidth:A.ownerDocument.defaultView.innerWidth,windowHeight:A.ownerDocument.defaultView.innerHeight,scrollX:A.ownerDocument.defaultView.pageXOffset,scrollY:A.ownerDocument.defaultView.pageYOffset},e.logger.child(n))}).then(function(e){return new Promise(function(t,n){var o=document.createElement("img");o.onload=function(){return t(e)},o.onerror=n,o.src=e.toDataURL(),r.parentNode&&r.parentNode.replaceChild((0,i.copyCSSStyles)(A.ownerDocument.defaultView.getComputedStyle(A),o),r)})}),r}if(A instanceof HTMLStyleElement&&A.sheet&&A.sheet.cssRules){var c=[].slice.call(A.sheet.cssRules,0).reduce(function(A,t){try{return t&&t.cssText?A+t.cssText:A}catch(r){return e.logger.log("Unable to access cssText property",t.name),A}},""),u=A.cloneNode(!1);return u.textContent=c,u}return A.cloneNode(!1)}},{key:"cloneNode",value:function(A){var e=A.nodeType===Node.TEXT_NODE?document.createTextNode(A.nodeValue):this.createElementClone(A),t=A.ownerDocument.defaultView,r=A instanceof t.HTMLElement?t.getComputedStyle(A):null,n=A instanceof t.HTMLElement?t.getComputedStyle(A,":before"):null,o=A instanceof t.HTMLElement?t.getComputedStyle(A,":after"):null;this.referenceElement===A&&e instanceof t.HTMLElement&&(this.clonedReferenceElement=e),e instanceof t.HTMLBodyElement&&F(e);for(var s=(0,c.parseCounterReset)(r,this.pseudoContentData),a=(0,c.resolvePseudoContent)(A,n,this.pseudoContentData),B=A.firstChild;B;B=B.nextSibling)B.nodeType===Node.ELEMENT_NODE&&("SCRIPT"===B.nodeName||B.hasAttribute("data-html2canvas-ignore")||"function"==typeof this.options.ignoreElements&&this.options.ignoreElements(B))||this.copyStyles&&"STYLE"===B.nodeName||e.appendChild(this.cloneNode(B));var l=(0,c.resolvePseudoContent)(A,o,this.pseudoContentData);if((0,c.popCounters)(s,this.pseudoContentData),A instanceof t.HTMLElement&&e instanceof t.HTMLElement)switch(n&&this.inlineAllImages(h(A,e,n,a,f)),o&&this.inlineAllImages(h(A,e,o,l,U)),!r||!this.copyStyles||A instanceof HTMLIFrameElement||(0,i.copyCSSStyles)(r,e),this.inlineAllImages(e),0===A.scrollTop&&0===A.scrollLeft||this.scrolledElements.push([e,A.scrollLeft,A.scrollTop]),A.nodeName){case"CANVAS":this.copyStyles||g(A,e);break;case"TEXTAREA":case"SELECT":e.value=A.value}return e}}]),A}(),w=function(A,e){return(A.cssRules?Array.from(A.cssRules):[]).filter(function(A){return A.type===CSSRule.FONT_FACE_RULE}).map(function(A){for(var t=(0,B.parseBackgroundImage)(A.style.getPropertyValue("src")),r=[],n=0;n<t.length;n++)if("url"===t[n].method&&t[n+1]&&"format"===t[n+1].method){var o=e.createElement("a");o.href=t[n].args[0],e.body&&e.body.appendChild(o);var s={src:o.href,format:t[n+1].args[0]};r.push(s)}return{formats:r.filter(function(A){return/^woff/i.test(A.format)}),fontFace:A.style}}).filter(function(A){return A.formats.length})},Q=function(A,e){var t=document.implementation.createHTMLDocument(""),r=document.createElement("base");r.href=e;var n=document.createElement("style");return n.textContent=A,t.head&&t.head.appendChild(r),t.body&&t.body.appendChild(n),n.sheet?w(n.sheet,t):[]},g=function(A,e){try{if(e){e.width=A.width,e.height=A.height;var t=A.getContext("2d"),r=e.getContext("2d");t?r.putImageData(t.getImageData(0,0,A.width,A.height),0,0):r.drawImage(A,0,0)}}catch(A){}},h=function(A,e,t,r,n){if(t&&t.content&&"none"!==t.content&&"-moz-alt-content"!==t.content&&"none"!==t.display){var o=e.ownerDocument.createElement("html2canvaspseudoelement");if((0,i.copyCSSStyles)(t,o),r)for(var s=r.length,a=0;a<s;a++){var l=r[a];switch(l.type){case c.PSEUDO_CONTENT_ITEM_TYPE.IMAGE:var u=e.ownerDocument.createElement("img");u.src=(0,B.parseBackgroundImage)("url("+l.value+")")[0].args[0],u.style.opacity="1",o.appendChild(u);break;case c.PSEUDO_CONTENT_ITEM_TYPE.TEXT:o.appendChild(e.ownerDocument.createTextNode(l.value))}}return o.className=C+" "+E,e.className+=n===f?" "+C:" "+E,n===f?e.insertBefore(o,e.firstChild):e.appendChild(o),o}},f=":before",U=":after",C="___html2canvas___pseudoelement_before",E="___html2canvas___pseudoelement_after",F=function(A){p(A,"."+C+f+'{\n    content: "" !important;\n    display: none !important;\n}\n         .'+E+U+'{\n    content: "" !important;\n    display: none !important;\n}')},p=function(A,e){var t=A.ownerDocument.createElement("style");t.innerHTML=e,A.appendChild(t)},H=function(A){var e=r(A,3),t=e[0],n=e[1],o=e[2];t.scrollLeft=n,t.scrollTop=o},m=function(){return Math.ceil(Date.now()+1e7*Math.random()).toString(16)},v=/^data:text\/(.+);(base64)?,(.*)$/i,b=function(A,e){try{return Promise.resolve(A.contentWindow.document.documentElement)}catch(t){return e.proxy?(0,s.Proxy)(A.src,e).then(function(A){var e=A.match(v);return e?"base64"===e[2]?window.atob(decodeURIComponent(e[3])):decodeURIComponent(e[3]):Promise.reject()}).then(function(e){return I(A.ownerDocument,(0,o.parseBounds)(A,0,0)).then(function(A){var t=A.contentWindow.document;t.open(),t.write(e);var r=T(A).then(function(){return t.documentElement});return t.close(),r})}):Promise.reject()}},I=function(A,e){var t=A.createElement("iframe");return t.className="html2canvas-container",t.style.visibility="hidden",t.style.position="fixed",t.style.left="-10000px",t.style.top="0px",t.style.border="0",t.width=e.width.toString(),t.height=e.height.toString(),t.scrolling="no",t.setAttribute("data-html2canvas-ignore","true"),A.body?(A.body.appendChild(t),Promise.resolve(t)):Promise.reject("")},T=function(A){var e=A.contentWindow,t=e.document;return new Promise(function(r,n){e.onload=A.onload=t.onreadystatechange=function(){var e=setInterval(function(){t.body.childNodes.length>0&&"complete"===t.readyState&&(clearInterval(e),r(A))},50)}})},N=(e.cloneWindow=function(A,e,t,r,n,o){var s=new d(t,r,n,!1,o),a=A.defaultView.pageXOffset,i=A.defaultView.pageYOffset;return I(A,e).then(function(n){var o=n.contentWindow,B=o.document,l=T(n).then(function(){s.scrolledElements.forEach(H),o.scrollTo(e.left,e.top),!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||o.scrollY===e.top&&o.scrollX===e.left||(B.documentElement.style.top=-e.top+"px",B.documentElement.style.left=-e.left+"px",B.documentElement.style.position="absolute");var t=Promise.resolve([n,s.clonedReferenceElement,s.resourceLoader]),a=r.onclone;return s.clonedReferenceElement instanceof o.HTMLElement||s.clonedReferenceElement instanceof A.defaultView.HTMLElement||s.clonedReferenceElement instanceof HTMLElement?"function"==typeof a?Promise.resolve().then(function(){return a(B)}).then(function(){return t}):t:Promise.reject("")});return B.open(),B.write(N(document.doctype)+"<html></html>"),function(A,e,t){!A.defaultView||e===A.defaultView.pageXOffset&&t===A.defaultView.pageYOffset||A.defaultView.scrollTo(e,t)}(t.ownerDocument,a,i),B.replaceChild(B.adoptNode(s.documentElement),B.documentElement),B.close(),l})},function(A){var e="";return A&&(e+="<!DOCTYPE ",A.name&&(e+=A.name),A.internalSubset&&(e+=A.internalSubset),A.publicId&&(e+='"'+A.publicId+'"'),A.systemId&&(e+='"'+A.systemId+'"'),e+=">"),e})},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.ResourceStore=void 0;var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),o=(r=t(10))&&r.__esModule?r:{default:r},s=t(26);function a(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function A(e,t,r){a(this,A),this.options=e,this._window=r,this.origin=this.getOrigin(r.location.href),this.cache={},this.logger=t,this._index=0}return n(A,[{key:"loadImage",value:function(A){var e=this;if(this.hasResourceInCache(A))return A;if(Q(A))return this.cache[A]=h(A,this.options.imageTimeout||0),A;if(!g(A)||o.default.SUPPORT_SVG_DRAWING){if(!0===this.options.allowTaint||d(A)||this.isSameOrigin(A))return this.addImage(A,A,!1);if(!this.isSameOrigin(A)){if("string"==typeof this.options.proxy)return this.cache[A]=(0,s.Proxy)(A,this.options).then(function(A){return h(A,e.options.imageTimeout||0)}),A;if(!0===this.options.useCORS&&o.default.SUPPORT_CORS_IMAGES)return this.addImage(A,A,!0)}}}},{key:"inlineImage",value:function(A){var e=this;return d(A)?h(A,this.options.imageTimeout||0):this.hasResourceInCache(A)?this.cache[A]:this.isSameOrigin(A)||"string"!=typeof this.options.proxy?this.xhrImage(A):this.cache[A]=(0,s.Proxy)(A,this.options).then(function(A){return h(A,e.options.imageTimeout||0)})}},{key:"xhrImage",value:function(A){var e=this;return this.cache[A]=new Promise(function(t,r){var n=new XMLHttpRequest;if(n.onreadystatechange=function(){if(4===n.readyState)if(200!==n.status)r("Failed to fetch image "+A.substring(0,256)+" with status code "+n.status);else{var e=new FileReader;e.addEventListener("load",function(){var A=e.result;t(A)},!1),e.addEventListener("error",function(A){return r(A)},!1),e.readAsDataURL(n.response)}},n.responseType="blob",e.options.imageTimeout){var o=e.options.imageTimeout;n.timeout=o,n.ontimeout=function(){return r("")}}n.open("GET",A,!0),n.send()}).then(function(A){return h(A,e.options.imageTimeout||0)}),this.cache[A]}},{key:"loadCanvas",value:function(A){var e=String(this._index++);return this.cache[e]=Promise.resolve(A),e}},{key:"hasResourceInCache",value:function(A){return void 0!==this.cache[A]}},{key:"addImage",value:function(A,e,t){var r=this,n=function(A){return new Promise(function(n,o){var s=new Image;if(s.onload=function(){return n(s)},A&&!t||(s.crossOrigin="anonymous"),s.onerror=o,s.src=e,!0===s.complete&&setTimeout(function(){n(s)},500),r.options.imageTimeout){var a=r.options.imageTimeout;setTimeout(function(){return o("")},a)}})};return this.cache[A]=w(e)&&!g(e)?o.default.SUPPORT_BASE64_DRAWING(e).then(n):n(!0),A}},{key:"isSameOrigin",value:function(A){return this.getOrigin(A)===this.origin}},{key:"getOrigin",value:function(A){var e=this._link||(this._link=this._window.document.createElement("a"));return e.href=A,e.href=e.href,e.protocol+e.hostname+e.port}},{key:"ready",value:function(){var A=this,e=Object.keys(this.cache),t=e.map(function(e){return A.cache[e].catch(function(A){return null})});return Promise.all(t).then(function(A){return new B(e,A)})}}]),A}();e.default=i;var B=e.ResourceStore=function(){function A(e,t){a(this,A),this._keys=e,this._resources=t}return n(A,[{key:"get",value:function(A){var e=this._keys.indexOf(A);return-1===e?null:this._resources[e]}}]),A}(),l=/^data:image\/svg\+xml/i,c=/^data:image\/.*;base64,/i,u=/^data:image\/.*/i,d=function(A){return u.test(A)},w=function(A){return c.test(A)},Q=function(A){return"blob"===A.substr(0,4)},g=function(A){return"svg"===A.substr(-3).toLowerCase()||l.test(A)},h=function(A,e){return new Promise(function(t,r){var n=new Image;n.onload=function(){return t(n)},n.onerror=r,n.src=A,!0===n.complete&&setTimeout(function(){t(n)},500),e&&setTimeout(function(){return r("")},e)})}},function(A,e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.parseContent=e.resolvePseudoContent=e.popCounters=e.parseCounterReset=e.TOKEN_TYPE=e.PSEUDO_CONTENT_ITEM_TYPE=void 0;var r=function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,o=void 0;try{for(var s,a=A[Symbol.iterator]();!(r=(s=a.next()).done)&&(t.push(s.value),!e||t.length!==e);r=!0);}catch(A){n=!0,o=A}finally{try{!r&&a.return&&a.return()}finally{if(n)throw o}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},n=t(14),o=t(8),s=e.PSEUDO_CONTENT_ITEM_TYPE={TEXT:0,IMAGE:1},a=e.TOKEN_TYPE={STRING:0,ATTRIBUTE:1,URL:2,COUNTER:3,COUNTERS:4,OPENQUOTE:5,CLOSEQUOTE:6},i=(e.parseCounterReset=function(A,e){if(!A||!A.counterReset||"none"===A.counterReset)return[];for(var t=[],n=A.counterReset.split(/\s*,\s*/),o=n.length,s=0;s<o;s++){var a=n[s].split(/\s+/),i=r(a,2),B=i[0],l=i[1];t.push(B);var c=e.counters[B];c||(c=e.counters[B]=[]),c.push(parseInt(l||0,10))}return t},e.popCounters=function(A,e){for(var t=A.length,r=0;r<t;r++)e.counters[A[r]].pop()},e.resolvePseudoContent=function(A,e,t){if(!e||!e.content||"none"===e.content||"-moz-alt-content"===e.content||"none"===e.display)return null;var n=i(e.content),o=n.length,B=[],u="",d=e.counterIncrement;if(d&&"none"!==d){var w=d.split(/\s+/),Q=r(w,2),g=Q[0],h=Q[1],f=t.counters[g];f&&(f[f.length-1]+=void 0===h?1:parseInt(h,10))}for(var U=0;U<o;U++){var C=n[U];switch(C.type){case a.STRING:u+=C.value||"";break;case a.ATTRIBUTE:A instanceof HTMLElement&&C.value&&(u+=A.getAttribute(C.value)||"");break;case a.COUNTER:var E=t.counters[C.name||""];E&&(u+=c([E[E.length-1]],"",C.format));break;case a.COUNTERS:var F=t.counters[C.name||""];F&&(u+=c(F,C.glue,C.format));break;case a.OPENQUOTE:u+=l(e,!0,t.quoteDepth),t.quoteDepth++;break;case a.CLOSEQUOTE:t.quoteDepth--,u+=l(e,!1,t.quoteDepth);break;case a.URL:u&&(B.push({type:s.TEXT,value:u}),u=""),B.push({type:s.IMAGE,value:C.value||""})}}return u&&B.push({type:s.TEXT,value:u}),B},e.parseContent=function(A,e){if(e&&e[A])return e[A];for(var t=[],r=A.length,n=!1,o=!1,s=!1,i="",l="",c=[],u=0;u<r;u++){var d=A.charAt(u);switch(d){case"'":case'"':o?i+=d:(n=!n,s||n||(t.push({type:a.STRING,value:i}),i=""));break;case"\\":o?(i+=d,o=!1):o=!0;break;case"(":n?i+=d:(s=!0,l=i,i="",c=[]);break;case")":if(n)i+=d;else if(s){switch(i&&c.push(i),l){case"attr":c.length>0&&t.push({type:a.ATTRIBUTE,value:c[0]});break;case"counter":if(c.length>0){var w={type:a.COUNTER,name:c[0]};c.length>1&&(w.format=c[1]),t.push(w)}break;case"counters":if(c.length>0){var Q={type:a.COUNTERS,name:c[0]};c.length>1&&(Q.glue=c[1]),c.length>2&&(Q.format=c[2]),t.push(Q)}break;case"url":c.length>0&&t.push({type:a.URL,value:c[0]})}s=!1,i=""}break;case",":n?i+=d:s&&(c.push(i),i="");break;case" ":case"\t":n?i+=d:i&&(B(t,i),i="");break;default:i+=d}"\\"!==d&&(o=!1)}return i&&B(t,i),e&&(e[A]=t),t}),B=function(A,e){switch(e){case"open-quote":A.push({type:a.OPENQUOTE});break;case"close-quote":A.push({type:a.CLOSEQUOTE})}},l=function(A,e,t){var r=A.quotes?A.quotes.split(/\s+/):["'\"'","'\"'"],n=2*t;return n>=r.length&&(n=r.length-2),e||++n,r[n].replace(/^["']|["']$/g,"")},c=function(A,e,t){for(var r=A.length,s="",a=0;a<r;a++)a>0&&(s+=e||""),s+=(0,n.createCounterText)(A[a],(0,o.parseListStyleType)(t||"decimal"),!1);return s}}])})}).call(this,t(14)(A))},function(A,e){A.exports=function(A){return A.webpackPolyfill||(A.deprecate=function(){},A.paths=[],A.children||(A.children=[]),Object.defineProperty(A,"loaded",{enumerable:!0,get:function(){return A.l}}),Object.defineProperty(A,"id",{enumerable:!0,get:function(){return A.i}}),A.webpackPolyfill=1),A}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A,e,t,n){[{name:"n",style:{top:"-"+t/2+"px",left:0,width:"100%",height:t/2+"px"}},{name:"s",style:{bottom:"-"+t/2+"px",left:0,width:"100%",height:t/2+"px"}},{name:"w",style:{top:0,left:"-"+t/2+"px",width:t/2+"px",height:"100%"}},{name:"e",style:{top:0,right:"-"+t/2+"px",width:t/2+"px",height:"100%"}}].forEach(function(e){A.appendChild(function(A,e,t){var n=document.createElement("div");return n.id=A+"kssLine",n.className="kssLine",(0,r.css)(n,{cursor:A+"-resize"}),(0,r.css)(n,e),n}(e.name,e.style))}),[{name:"nw",style:{top:"-"+e/2+"px",left:"-"+e/2+"px"}},{name:"ne",style:{top:"-"+e/2+"px",right:"-"+e/2+"px"}},{name:"se",style:{bottom:"-"+e/2+"px",right:"-"+e/2+"px"}},{name:"e",style:{top:"calc(50% - "+e/2+"px)",right:"-"+e/2+"px"}},{name:"w",style:{top:"calc(50% - "+e/2+"px)",left:"-"+e/2+"px"}},{name:"n",style:{top:"-"+e/2+"px",left:"calc(50% - "+e/2+"px)"}},{name:"s",style:{bottom:"-"+e/2+"px",left:"calc(50% - "+e/2+"px)"}},{name:"sw",style:{bottom:"-"+e/2+"px",left:"-"+e/2+"px"}}].forEach(function(t){A.appendChild(function(A,e,t){var n=document.createElement("div");return n.id=A+"kssDot",n.className="kssDot",(0,r.css)(n,{width:t+"px",height:t+"px",cursor:A+"-resize"}),(0,r.css)(n,e),n}(t.name,t.style,e,t.id))}),B("swkssDot",A,n),B("sekssDot",A,n),B("nwkssDot",A,n),B("nekssDot",A,n),l("horizontal","ekssDot",A,n),l("horizontal","wkssDot",A,n),l("horizontal","ekssLine",A,n),l("horizontal","wkssLine",A,n),l("vertical","nkssDot",A,n),l("vertical","skssDot",A,n),l("vertical","nkssLine",A,n),l("vertical","skssLine",A,n)};var r=t(0),n=i(t(4)),o=i(t(8)),s=i(t(9)),a=i(t(6));function i(A){return A&&A.__esModule?A:{default:A}}function B(A,e,t){document.getElementById(A).addEventListener("mousedown",function(A){if(!t.isEdit){(0,o.default)(t),document.addEventListener("mousemove",l);var i=c(t.startX,t.width,A.clientX),B=c(t.startY,t.height,A.clientY);t.startX=2*(t.startX+t.width/2)-i,t.startY=2*(t.startY+t.height/2)-B;A.clientX,A.clientY;document.addEventListener("mouseup",function A(e){var r=(0,s.default)(e);var o=r[0];var a=r[1];t.width=Math.abs(o-t.startX);t.height=Math.abs(a-t.startY);t.startX=Math.min(o,t.startX);t.startY=Math.min(t.startY,a);document.removeEventListener("mousemove",l);document.removeEventListener("mouseup",A);(0,n.default)(t)})}function l(A){var n=(0,s.default)(A),o=n[0],i=n[1],B=Math.abs(i-t.startY),l=Math.abs(o-t.startX),c=Math.min(t.startY,i),u=Math.min(t.startX,o),d={height:B+"px",width:l+"px",top:c+"px",left:u+"px"};(0,r.css)(e,d),(0,a.default)(t,l,B,c,u,t.toolbar)}})}function l(A,e,t,i){document.getElementById(e).addEventListener("mousedown",function(e){if(!i.isEdit){(0,o.default)(i),document.addEventListener("mousemove",u);var B=c(i.startX,i.width,e.clientX),l=c(i.startY,i.height,e.clientY);"horizontal"===A?i.startX=2*(i.startX+i.width/2)-B:"vertical"===A&&(i.startY=2*(i.startY+i.height/2)-l);e.clientX,e.clientY;document.addEventListener("mouseup",function e(t){var r=(0,s.default)(t);var o=r[0];var a=r[1];"horizontal"===A?(i.width=Math.abs(o-i.startX),i.startX=Math.min(o,i.startX)):"vertical"===A&&(i.height=Math.abs(a-i.startY),i.startY=Math.min(i.startY,a));document.removeEventListener("mousemove",u);document.removeEventListener("mouseup",e);(0,n.default)(i)})}function u(e){var n=(0,s.default)(e),o=n[0],B=n[1],l=Math.abs(B-i.startY),c=Math.abs(o-i.startX),u=Math.min(i.startY,B),d=Math.min(i.startX,o),w=void 0;"horizontal"===A?w={width:c+"px",left:d+"px"}:"vertical"===A&&(w={height:l+"px",top:u+"px"}),(0,r.css)(t,w);(0,a.default)(i,c,l,u,d,i.toolbar),"horizontal"===A?(0,a.default)(i,c,i.height,i.startY,d,i.toolbar):"vertical"===A&&(0,a.default)(i,i.width,l,u,i.left,i.toolbar)}})}function c(A,e,t){return Math.abs(t-A)>=Math.abs(t-A-e)?A+e:A}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("div");e.id="kssToolbar","[object Object]"!==(0,r.typeChecking)(A.toolShow)&&(A.toolShow={});var t=0;return g.forEach(function(r){!1!==A.toolShow[r.show]&&(e.appendChild(r.component(A)),t+=r.width)}),t+=10,A.toolbarWidth=t,(0,r.css)(e,{top:A.height+A.toolbarMarginTop+"px",width:t+"px",height:A.toolbarHeight+"px"}),(0,w.default)(A,A.width,A.height,A.startY,A.startX,e),e.appendChild((0,d.default)(A)),A.kssScreenShotWrapper.appendChild(e),e};var r=t(0),n=Q(t(17)),o=Q(t(20)),s=Q(t(22)),a=Q(t(25)),i=Q(t(27)),B=Q(t(29)),l=Q(t(31)),c=Q(t(33)),u=Q(t(35)),d=Q(t(37)),w=Q(t(6));function Q(A){return A&&A.__esModule?A:{default:A}}var g=[{component:n.default,show:"complete",width:40},{component:o.default,show:"quit",width:30},{component:a.default,show:"back",width:30},{component:s.default,show:"arrow",width:30},{component:i.default,show:"drawLine",width:30},{component:B.default,show:"rect",width:30},{component:l.default,show:"ellipse",width:30},{component:u.default,show:"text",width:30},{component:c.default,show:"color",width:30}]},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");return e.id="kssCompleteBT",e.className="kssToolbarItemBT",e.innerHTML="完成",e.title="完成截图",(0,r.css)(e,{width:"40px","line-height":"28px"}),e.addEventListener("click",async function(){A.isEdit=!0;var e=A.snapshootList[A.snapshootList.length-1];(0,n.default)(A,e),!0===A.needDownload&&await(0,o.default)(A),"[object Function]"===(0,r.typeChecking)(A.endCB)&&A.endCB(e),(0,s.default)(A)}),e};var r=t(0),n=(a(t(4)),a(t(18))),o=a(t(19)),s=a(t(7));function a(A){return A&&A.__esModule?A:{default:A}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A,e){var t=document.createElement("span");(0,r.css)(t,{opacity:"0"});var n=document.createElement("img"),o=void 0;o="[object Function]"===(0,r.typeChecking)(A.copyPath)?A.copyPath(e):null;if(null===o)return;n.src=o;t.appendChild(n),document.body.appendChild(t),setTimeout(function(){(0,r.css)(n,{width:n.width/A.scale+"px",height:n.height/A.scale+"px"});var e=window.getSelection(),o=document.createRange();o.selectNodeContents(t),e.removeAllRanges(),e.addRange(o),document.execCommand("Copy"),(0,r.remove)(t)},0)};var r=t(0)},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){return new Promise(function(e){var t=A.snapshootList[A.snapshootList.length-1],r=document.createElement("a");if("download"in r){r.href=t,r.download="kss"+(new Date).getTime()+".png";var n=document.createEvent("MouseEvents");n.initEvent("click",!1,!1),r.dispatchEvent(n)}else{var o=t.replace("image/png","image/octet-stream");window.location.href=o}e()})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssQuitBT",e.className="kssToolbarItemBT",e.title="退出截图";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=r.default,A.quitBT=t,e.appendChild(t),e.addEventListener("click",function(){A.isEdit=!0,(0,n.default)(A),A.cancelCB()}),e};t(0),o(t(4));var r=o(t(21)),n=o(t(7));function o(A){return A&&A.__esModule?A:{default:A}}},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkElEQVRYR+2Wv07CcBDHf1eaaNq+haMv4Ao9dk18BZhAF1iITsQ4QFxgEZ7B6EyO2Vdw8iloownhTKsltemfX69DGfitvbvvp9+73x9QNS+oWV8dAQ7Tge9m83xrmk/AvLCIXqrMie+6NzvDuDCZ706JPpO1Uh3wEF8VwGUQDMx9i2gugfARewwwC3OZ32yiKz2AdnuklHqIgiUQ/8QD/d1u5KzXj1oAQZCHuFAAHQlEUlwxL22ibpqLuUMogdggDgBgshfLEQ9bXNTbJAQzDx2iaVpeivjcJurnaRQC/LVjpgB6UaE0CIm4lgORqIeYCSEVLwWQ5URYJNZzZp46RMOi1u6HWzcwy4l4flnx0g7kQUjExQAbxAkADKr+vQggOYxVIbS2Yab1zPfhN4Bx7OAp3PtxaG2AWrehzmkoPQsKHdARjyyVQBzmZcRKgY/4XNt17NX9IIk/yRRz1yZalj2yg3jxk+yr1TrbNhpjg/ndIvp90wmX77rXbBgdE+D2ZLX6SJYp3AVCXe20I8DRgR/EvCcwIlPjxgAAAABJRU5ErkJggg=="},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssArrowBT",e.className="kssToolbarItemBT",e.title="箭头工具";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=s.default,A.arrowBT=e,e.appendChild(t),e.addEventListener("click",function(){function t(e){if(2!==e.button){var t=e.clientX,s=e.clientY;document.addEventListener("mousemove",i),document.addEventListener("mouseup",B),A.toolmousemove=i,A.toolmouseup=B;var a={distance:null,twoSide:null,bottomSide:null,crossWidth:null}}function i(e){(0,n.default)(A);var o=e.clientX,i=e.clientY;o<A.startX?o=A.startX:o>A.startX+A.width&&(o=A.startX+A.width),i<A.startY?i=A.startY:i>A.startY+A.height&&(i=A.startY+A.height),(0,r.default)({x:t-A.startX,y:s-A.startY},{x:o-A.startX,y:i-A.startY},a,A)}function B(e){var r=e.clientX,n=e.clientY;if(t===r&&s===n)return document.removeEventListener("mousemove",i),void document.removeEventListener("mouseup",B);document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",B),(0,o.default)(A)}}A.isEdit=!0,"arrow"!==A.currentToolType&&(A.currentToolType="arrow",(0,a.default)(e),(0,i.default)(A,"canvasLayer"),A.toolmousedown&&(A.rectangleCanvas.removeEventListener("mousedown",A.toolmousedown),document.removeEventListener("mousemove",A.toolmousemove),document.removeEventListener("mouseup",A.toolmouseup)),A.rectangleCanvas.addEventListener("mousedown",t),A.toolmousedown=t)}),e};t(0);var r=B(t(23)),n=B(t(5)),o=B(t(3)),s=B(t(24)),a=B(t(1)),i=B(t(2));function B(A){return A&&A.__esModule?A:{default:A}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A,e,t,n){var o=A.x*n.scale,s=A.y*n.scale,a=e.x*n.scale,i=e.y*n.scale;(0,r.computed)(t,"distance",["twoSide","bottomSide","crossWidth"],[function(A,e,t){A[t]=e/2*1.1<=20?e/2*1.1:20},function(A,e,t){A[t]=e/2*1.1<=20?e/2*1.1*.8:16},function(A,e,t){A[t]=e/2*1.1<=20?e/2*1.1*.4:8}]);var B=Math.sqrt(Math.pow(o-a,2)+Math.pow(s-i,2));t.distance=B;var l=Math.sqrt(Math.pow(t.twoSide,2)-Math.pow(t.bottomSide/2,2)),c=Math.sqrt(Math.pow(l,2)+Math.pow(t.crossWidth/2,2)),u=180*Math.atan(t.bottomSide/2/l)/Math.PI,d=180*Math.atan(t.crossWidth/2/l)/Math.PI,w=void 0,Q=void 0,g=void 0,h=void 0,f=void 0,U=void 0,C=void 0,E=void 0;if(o>a&&s>i||o<a&&s<i){var F=180*Math.atan(Math.abs(o-a)/Math.abs(s-i))/Math.PI,p=Math.cos(2*(d+F)*Math.PI/360)*c,H=Math.sin(2*(d+F)*Math.PI/360)*c,m=1;o<a&&s<i&&(m=-1),w=a+H*m,Q=i+p*m;var v=Math.cos(2*(u+F)*Math.PI/360)*t.twoSide,b=Math.sin(2*(u+F)*Math.PI/360)*t.twoSide;g=a+b*m,h=i+v*m;var I=Math.cos(2*F*Math.PI/360)*l,T=Math.sin(2*F*Math.PI/360)*l,N=a+T*m,y=i+I*m;C=2*N-w,E=2*y-Q,f=2*N-g,U=2*y-h}else if(o<a&&s>i||o>a&&s<i){var K=180*Math.atan(Math.abs(s-i)/Math.abs(o-a))/Math.PI,S=Math.cos(2*(d+K)*Math.PI/360)*c,L=Math.sin(2*(d+K)*Math.PI/360)*c,M=1;o<a&&s>i&&(M=-1),w=a+S*M,Q=i-L*M;var D=Math.cos(2*(u+K)*Math.PI/360)*t.twoSide,O=Math.sin(2*(u+K)*Math.PI/360)*t.twoSide;g=a+D*M,h=i-O*M;var _=Math.cos(2*K*Math.PI/360)*l,R=Math.sin(2*K*Math.PI/360)*l,P=a+_*M,k=i-R*M;C=2*P-w,E=2*k-Q,f=2*P-g,U=2*k-h}else if(o===a){var x=1;s<i&&(x=-1);var X=a,z=i+l*x;w=X+t.crossWidth/2*x,Q=z,g=X+t.bottomSide/2*x,h=z,C=X-t.crossWidth/2*x,E=z,f=X-t.bottomSide/2*x,U=z}else if(s===i){var V=1;o<a&&(V=-1);var Y=a+l*V,G=i;w=Y,Q=G+t.crossWidth/2*V,g=Y,h=G+t.bottomSide/2*V,C=Y,E=G-t.crossWidth/2*V,f=Y,U=G-t.bottomSide/2*V}var J=n.rectangleCanvas.getContext("2d");J.beginPath(),J.lineWidth=1,J.moveTo(o,s),J.lineTo(w,Q),J.lineTo(g,h),J.lineTo(a,i),J.lineTo(f,U),J.lineTo(C,E),J.lineTo(o,s),J.fillStyle=n.toolbarColor,J.fill(),J.closePath()};var r=t(0)},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABvElEQVRIS+XWvUrDUBQH8P+51qZ+0C6u4uwoRQenCsXG78kX8AHEVsFRxw7aFDdBH0A3QUojIk6KID6BoELB3YKStM2RoNXaJjVpbxUxU4Z78jvn3nPvDeGXHvolF38HntrhMMrlESZvSTNXCnoqdFs/s74qTmSMBSIcAFB8LREjl08pM7UxvmBVM44AzPtC3wczKKongzfVWF9wQjPSBKy3AgNiIp/sPm8JXjzkrmLBWAZRxAlnRpQIs86JtQE3q1TNmqNgPgUQ/jHYRpn5jIB+9+QkV+yCGgBfAhT7TEQi7I4KFbBsdEM63Ay1u1fVjE3p8HeoXaV02AsqHfaKSoUnt0vjJCy9bssYgFBrT6RqM0mZahsVZJ2C0FOzT11Re8ykZi4J8L79zkAJCA7pSXr0fGQ6oowXkJh2qrT6Yft4fSoYWYAGWfDeyUro2PPt5IZaLOInq90XrV0Wb1Gut1MnUVe406gj/BNoAxzb4gFFmPdE6PtYP8aLjDWt74cva5zImGNEfNVptKHiuV3uNZ/NawKGwShaLNR2u9et8xu6Op7mSEApj4hK4C63Rg/tbJlmsb5+9mQm8f/gVxWf/x9Ysb+OAAAAAElFTkSuQmCC"},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssbackeBT",e.className="kssToolbarItemBT",e.title="后退";var t=document.createElement("img");function a(){A.isEdit=!1,A.currentToolType=null,A.rectangleCanvas.removeEventListener("mousedown",A.toolmousedown),document.removeEventListener("mousemove",A.toolmousemove),document.removeEventListener("mouseup",A.toolmouseup),(0,o.default)(null)}return t.className="kssToolbarItemImg",t.src=n.default,A.backBT=e,e.appendChild(t),e.addEventListener("click",function(){A.snapshootList.length>1?(2===A.snapshootList.length&&((0,s.default)(A,"canvasLayer"),a()),A.snapshootList.pop()):1===A.snapshootList.length&&((0,s.default)(A,"canvasLayer"),a()),A.currentImgDom.src=A.snapshootList[A.snapshootList.length-1],setTimeout(function(){(0,r.default)(A)},0)}),e};t(0);var r=a(t(5)),n=a(t(26)),o=a(t(1)),s=a(t(2));function a(A){return A&&A.__esModule?A:{default:A}}},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAEfElEQVRIS8WWa4hUZRjH//8zXtKFFArybs05wUISUULqB9E9R7vQBT8YIblSGVgWVu6MVpSTZLt7xkzQbhSpGXSTEhGzPGeWgqhPiYZCcs7squgSUX0xNzfn/GNGZ52ZHecSgufT8M7zPL/neZ/L+xBX6eNV4qJxsMAO35plEAsFTQEwieB5Sf0g+6Tcvo1O7+FGA6kLfmafNfqa0UoAXEXg+pqGhayMaEN6fnYbCNWSrQlOeuZ8EdsITocUgfQjRtuRM07njRrUeADTQMyQMI/kzRdhhxhFS7sXZH+5HPyy4KRnrgbggjQA7DmvKLHJyR6rFUWyJz5TkbGVwJ2CBiA8mnbCz6rpVAUnPOtVEq9I+JsGlrhtwZ5Gc5eXS3hmkkBn3ulIWLrRCT6u1B8G7vCsRwxiJ6SzNKI53W29h5qBFmUT/k0LgdheSPkbuy/thPtL7ZSB1xyIj4tonCBxLZRb7Dq9uyqhiz9H7Mbr4g+l7ewn9RxKZMx2ijsknWyZGFqpWzBY1CkDJ33zNYAvSdibdoL7q0PNLwguGqHchNed3t/qwZOe9SOIWUD0nGtnNw8HC0z61u+CxsdiaO2aHwalRi9EegGaPx8c+e+kzXOP99cFZ+I2ZHiAfnXtsHUYeI1vzhH4g4Dv0nYwrxa0GXBeNumZp0FOFGCl7SDMnw1dddK31gFIUVjd7QSbiuDKSEscOiOoD2IfoKMRuOMNJzha7QaSvrkF4NNA9KRrZ98tB3vmdpDLJN1TrMAa0GH2BQnCzhH45/lO59QfpQJJz3oKxFtQ1Ok62RfLwAnPPEDSIXO3FVso4ZvvE1xeL4+l/ws4FdPg3C7nRLZ43uGbiwzwSwDbXDt4rCpYwB1pO/i5kBs/vgIw3mkGXJAVDrpOcPsQOGM9aAi7BX2QtsMnKsE7SLZDWuQ64e6iUtKPPwsYbzYLF3J3pe3eb0sDkLA+7QT5WiorrhSAdQK60nbwQlmO/ge8FJLwzc0EV4nR4+m27Idl4GI7QTrhOuH0yggrIx877mxLaubps6kejDhjTJ+K3MhbGWkFybsv6Gqna4ft+V8J3+wnOAG5c5PdhScLL9ulyVUYIOZfIMdFkL3RDjO14EVwpUyHb7ZR/ArQ12knfDh5aYAcce1wRlG+fGRmzJchrofwk+sEs6vlNeFbayltGBjk2C33Bueq9m2PNSWWGxjotE/9mchYRwm0QljpOsHbVcH5bWPMKB0DOa1ykJQC1nrT4qXtcrnCS2TiWyljZd1HIm+gw7NmG8T3gmKGsKTbCT9ttqILeR1605Wr+ywOtVDGTEB0C9OIWl6sxEYcyD+tMoyPADyQl294ERiCe+ZqAd0kYxB2iVhbHPDVHOj45oYWxlqWg0wRHC/hHKBlTa0+JfCyZU/gYRA9FAIZUR8jjhIxFcJMEIsJjrnYSkcEthcnYDVHm1hvsbLQizU+QccBdbe0Zd9LEVEt2brgIeWLCz0RLQA5lcBkgech9dNgn5HD/q4FwcFG6qB8gDSqcYXkGo/4CgGLZv4D60EPPWzjB68AAAAASUVORK5CYII="},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssDrawLineBT",e.className="kssToolbarItemBT",e.title="画刷工具";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=o.default,A.drawLineBT=e,e.appendChild(t),e.addEventListener("click",function(){A.isEdit=!0;var t=document.getElementById("kssSetLineWidth");function o(e){if(2!==e.button){var t=A.rectangleCanvas.getContext("2d");t.beginPath(),t.moveTo((e.clientX-A.startX)*A.scale,(e.clientY-A.startY)*A.scale),t.strokeStyle=A.toolbarColor,document.addEventListener("mousemove",r),document.addEventListener("mouseup",o),A.toolmousemove=r,A.toolmouseup=o}function r(e){t.lineWidth=A.toolbarLineWidth,t.lineTo((e.clientX-A.startX)*A.scale,(e.clientY-A.startY)*A.scale),t.stroke()}function o(e){t.closePath(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o),(0,n.default)(A)}}document.documentElement.clientHeight-A.startY-A.height-A.toolbarMarginTop-A.toolbarHeight<0?(0,r.css)(t,{top:"30px"}):(0,r.css)(t,{top:"-40px"}),t.style.display="block",t.focus(),"drawLine"!==A.currentToolType&&(A.currentToolType="drawLine",(0,s.default)(e),(0,a.default)(A,"canvasLayer"),A.toolmousedown&&(A.rectangleCanvas.removeEventListener("mousedown",A.toolmousedown),document.removeEventListener("mousemove",A.toolmousemove),document.removeEventListener("mouseup",A.toolmouseup)),A.rectangleCanvas.addEventListener("mousedown",o),A.toolmousedown=o)}),e};var r=t(0),n=i(t(3)),o=i(t(28)),s=i(t(1)),a=i(t(2));function i(A){return A&&A.__esModule?A:{default:A}}},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACM0lEQVRIS+3UO2hTYRgG4PftyR+Q9CqCEkgGJc2pRWgRBCkIVtChIDrYQR1EHFx0cnJROqh066IEFHRz00UXg9R08AJaXDRBRcwpQXBw0dj85/JJYkOjPWlzOTFLM2XI+Z687/efn+jSh11ysQn/t+YDr/rDVvS7veohwIMAchA9aVoo/JsoUHgFfQZwrAqJ4PqIpS93DPZDK5gn58wl+05H4C9xDP2CelqbdAV6nMzrowTcwOEyWhS1QHK0driIPDEte4qA7Xdi29pxXRR4ZOb18Xpo+Y+0DG+AHiPgrPdutgTnotjmGWp+bb14YFp6eiO0pcR/DlL4OYDk3zutoCf8DlIgO/48iMFSn8qA3LP6rsp907JPN4o2lfjrdkS+h9XtkItZV9sfsUWlQe4TqaAnCUgz921DOy6nXO5XaYJ7ReQnKUcinvOmSHV22LJvNouum7hSaa+6CmJCgDGSodVEUjIc7E8U7MVmUtb+1jexAKFsTC0S2CGQGxC8JnumQFwqPywiLwZc+1C0gGKg8PuYOgMiFQLHE3n9rjo8G1Ovyt/dZXty9Bt+tIr6Vv1pCAO6L/wWwL2RvL5SOzwbV2l6kkkuOTPtoGvgbDw0AeEtkBEjr3cngFKlWoC5uLoAcI7iHUhazkLAcHgaIncBvCSYgrgloTEO4hSAnRBJmZZ9vl3Ut+psFEkY6qKAhwnZBUJDON8D79qw5WSCQJu6QIICq3MaukCCRjcTd6LRujO7tuPfh7/TH020z8AAAAAASUVORK5CYII="},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssRectBT",e.className="kssToolbarItemBT",e.title="方形工具";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=o.default,A.rectBT=e,e.appendChild(t),e.addEventListener("click",function(){function t(e){if(2!==e.button){var t=e.clientX-A.startX,o=e.clientY-A.startY;document.addEventListener("mousemove",s),document.addEventListener("mouseup",a),A.toolmousemove=s,A.toolmouseup=a}function s(e){(0,r.default)(A);var n=A.rectangleCanvas.getContext("2d"),s=e.clientX,a=e.clientY;s<A.startX?s=A.startX:s>A.startX+A.width&&(s=A.startX+A.width),s-=A.startX,a<A.startY?a=A.startY:a>A.startY+A.height&&(a=A.startY+A.height),a-=A.startY,n.beginPath(),n.moveTo(Math.min(t,s)*A.scale,Math.min(o,a)*A.scale),n.lineTo(Math.max(t,s)*A.scale,Math.min(o,a)*A.scale),n.lineTo(Math.max(t,s)*A.scale,Math.max(o,a)*A.scale),n.lineTo(Math.min(t,s)*A.scale,Math.max(o,a)*A.scale),n.lineTo(Math.min(t,s)*A.scale,Math.min(o,a)*A.scale),n.lineWidth=1,n.strokeStyle=A.toolbarColor,n.stroke(),n.closePath()}function a(e){document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a),(0,n.default)(A)}}A.isEdit=!0,"rect"!==A.currentToolType&&(A.currentToolType="rect",(0,s.default)(e),(0,a.default)(A,"canvasLayer"),A.toolmousedown&&(A.rectangleCanvas.removeEventListener("mousedown",A.toolmousedown),document.removeEventListener("mousemove",A.toolmousemove),document.removeEventListener("mouseup",A.toolmouseup)),A.rectangleCanvas.addEventListener("mousedown",t),A.toolmousedown=t)}),e};t(0);var r=i(t(5)),n=i(t(3)),o=i(t(30)),s=i(t(1)),a=i(t(2));function i(A){return A&&A.__esModule?A:{default:A}}},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAA5klEQVRIS2NkGCDAOED2MoxaDA75ouWfUhkYGKWpEQ2MjIzveW9wT25oYPyHbB5GUBct/5TEyMA4lxqWIsz4X90byddGwOLPDYwMDPX/GRg2MjAwXKDEAYz/GVQYGBmi//9nmNkXxZtBpMWMiX2RPAsosbhw2RcPJsb/20ctBoUilsQFi+PRoCY9mY0mrtF8jJJqipaPZifSsxFMx2h2GvTZqZOJ4f8O8mOYgeH///9mDIyMnUTVx8XLPpWBFFNiIaZeIpo+oav+M8v9+5rz//9/QWpYTnRjjxqWEWPGaIOemFCiihoAPCwYLhqAkIYAAAAASUVORK5CYII="},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssArrowBT",e.className="kssToolbarItemBT",e.title="椭圆工具";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=o.default,A.ellipseBT=e,e.appendChild(t),e.addEventListener("click",function(){function t(e){if(2!==e.button){var t=e.clientX-A.startX,o=e.clientY-A.startY;document.addEventListener("mousemove",s),document.addEventListener("mouseup",a),A.toolmousemove=s,A.toolmouseup=a}function s(e){(0,r.default)(A);var n=A.rectangleCanvas.getContext("2d"),s=e.clientX,a=e.clientY;s<A.startX?s=A.startX:s>A.startX+A.width&&(s=A.startX+A.width),s-=A.startX,a<A.startY?a=A.startY:a>A.startY+A.height&&(a=A.startY+A.height),a-=A.startY;var i=(t+s)/2,B=(o+a)/2,l=Math.abs(s-t)/2,c=Math.abs(a-o)/2,u=.5522848,d=l*u,w=c*u;n.beginPath(),n.lineWidth=1,n.strokeStyle=A.toolbarColor,n.moveTo((i-l)*A.scale,B*A.scale),n.bezierCurveTo((i-l)*A.scale,(B-w)*A.scale,(i-d)*A.scale,(B-c)*A.scale,i*A.scale,(B-c)*A.scale),n.bezierCurveTo((i+d)*A.scale,(B-c)*A.scale,(i+l)*A.scale,(B-w)*A.scale,(i+l)*A.scale,B*A.scale),n.bezierCurveTo((i+l)*A.scale,(B+w)*A.scale,(i+d)*A.scale,(B+c)*A.scale,i*A.scale,(B+c)*A.scale),n.bezierCurveTo((i-d)*A.scale,(B+c)*A.scale,(i-l)*A.scale,(B+w)*A.scale,(i-l)*A.scale,B*A.scale),n.stroke(),n.closePath()}function a(e){document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a),(0,n.default)(A)}}A.isEdit=!0,"ellipse"!==A.currentToolType&&(A.currentToolType="ellipse",(0,s.default)(e),(0,a.default)(A,"canvasLayer"),A.toolmousedown&&(A.rectangleCanvas.removeEventListener("mousedown",A.toolmousedown),document.removeEventListener("mousemove",A.toolmousemove),document.removeEventListener("mouseup",A.toolmouseup)),A.rectangleCanvas.addEventListener("mousedown",t),A.toolmousedown=t)}),e};t(0);var r=i(t(5)),n=i(t(3)),o=i(t(32)),s=i(t(1)),a=i(t(2));function i(A){return A&&A.__esModule?A:{default:A}}},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADQElEQVRIS9WWT2gUZxjGn3dmIsbsrOhF8E+1hXpKQKtUD56sxaZFPKjb3Un00IqFQquZXXMUr0p2llAoVApVSWbWzUWkBGlpexQV06LisbZWhV4s3dl1Q3dmHhllIerszmQ1hM5xvvd9ft/7fR/v+wgW6ZNF4uL/AR6pcKXi1zIgBiBcT8AXyn0CN6mlpkoZeZT0BBNVPOLUtyr0T0BkEIAG8F9Q7lIgAm4AZDkAj+A0oJ60cn2/xm2gI7hwnn3sqZ0FsB/AbZDjAZf8XBpa+vtc4ZHJ2bdE+e89gXwJoJ/A1Kya+uTrjNTabaAt+Gil8YbmNX8AsJqCvJXVv4UIO1ZCill2DwtRBOSBp2m7xzO996JyIsFfTDDdo7o3AGkqqvbRWKb3btzRzV0vVBpv0vOmKdSavr7lq2GpvpgfCc7b7o8UbPQp744bqb/nA23FHnMaG1Q2bwJytWjo78eCC3Z9DxFcDDTZVMqkbnUDbeUUbDdDwQWKssfK9n0/V+ulik3HnRHwdjGXPvQq0Fau6VSvA6JaOf2dtuBRp77aR/AgCNRtpaFl114HOF+uD4LBtOqr604PL7vf0nyuYtN2PxPhqWJWXxH7ghPu6kCF6jrPfQTIqGXo30SC83Z1jCKbrJy+K6FuorC87f5E4YyVSx+PrthxJ4Vg0dCHEykmDDIjdJ876rztToRaCwEGGVhG+mCbO66GHWezZeg7ExaTKCzvuL+AvFE00oXoOy67RxBw7J6mr5jKiJ9INS6IlHzZ/Qcio8WsfiYSPDrxeK2v+n8FlMGSkbocp5lk3Sw/3i70r6hQ1pzO9T2MBIc/TSfs0WxYufSOJMJxMaZdPQeRfiunb+nYuZ62TAkuCfHxmKFX4oQ7rY9UagOKx9+oKHtjW2Yo9GxIcLsEPf3Fod4/u4EftWurNOEMiDuJhkQIaY1FIXzRegbnOxaPT86+HUjz0rzH4tOqJxvrId5lgGsoOGZl9e9i22j4gh33UwBWaARA7YN2J9bR+nxeYWqpVzsrgn3ztD4XZtXU4a6sz9x7NZ36ZsA/KZAPW2aPkD/CmAUxey8+qtDeilc7AMFACFxwe9vNq47LSeSr40S6WV808BNkBHIuAp7D7gAAAABJRU5ErkJggg=="},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssColorBT",e.className="kssToolbarItemBT",e.title="颜色工具";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=n.default,A.colorBT=e,e.appendChild(t),e.addEventListener("click",function(){var e=document.documentElement.clientHeight,t=document.getElementById("kssColorBoard");e-A.startY-A.height-A.toolbarMarginTop-A.toolbarHeight<0?(0,r.css)(t,{top:"30px"}):(0,r.css)(t,{top:"-40px"}),t.style.display="block",t.focus()}),e};var r=t(0),n=function(A){return A&&A.__esModule?A:{default:A}}(t(34))},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAEUElEQVRIS+2VXWwUZRSG3/ebbUuhf7Oh1QtR2+4umAbTBONP/Enw5wLxQhLDBRilQFi7w4+aYDDRpIlCg6ka2842jVAMMQRMBLzQVKMJJMRIVBLQAO5sqVgUhWRmtxCK7c4cM1vAtdLdLSb0xrmazHfmPOd9v3O+j5imh9PExf/gm+b8jVndJqqi1pobULzFr5Siucy4g/b68JliKy8aHOy2mkRxLSHNEJkP4oyAv4+DRBGcC0i5gN/DVeuddY0/5CuiMLhNAnpd8hUINpLodJUc0kZ52F4fHs5NrPcO3H6JmDFzzF0IYgsEW53z4Q600bteAXnB1fFEgwL2Ahhmhst8K3XTWp5NDAx6Glalo+GBoJnYAXKFiGQAbhDRPiUzH5I4YMcir08N7CutTR4RyPaUEXnv6s9B0xoCcVvWYGCrU1H5hn7xQpqAlv0mOOIY4QVV24aCgdGRHz0VWJR6oeHoRPikivW4tRki9Y7LlmqFpvSswHG01F/WzcRBko+MJ2LUPte4Ta+z/iA4+wr4E8cIP+2/6/HkIor3tl071oylTaO58OuCq+PJBZrIfrhogiYfgFwiIp85RmRxRU+yrsSTNwEec2obe7CUbo2ZaCbYDkrKQ1ksHbvDuQrR44lBIVtSreEDBcF63NopRJ8fHIwnDgO8VyBHnVikudhx+Rts7QO5x2kN7S4IDpqJL20j8njWrq6B+dS8JzylfXV1r6q7fq5X2ugmt7T81eHVc+x8xehmcisgpx0jHM8PfmeoXC8b6fcUOpXwWVfUlmGj8dvcn6q6E/cFFL8B5NeMaEsmrv9jzExrjwdsTxvhL/KCq3uSjypPngcwh8RCgXQ4scjGiaqCZmKvv/cQOWkbkbsmUx00E8cvB0ofuxS982xesN498CSUtxxkHJ68hoCKOtHGXyYmruz9abbmqnYFrPaIVanWcN+/4L1Somess44RyXZ8fsXxRIMmPGgHQg2IcqxQM+k9Vis8dAvYkjJCO3Pja3qslUow346FXyoIzjaUae0nxHOpNqe1xmOFCsjCBaYIV1yDbz9ZGbysfWfPcO/BqnkXigKj0yqrCcgyCp4BcT+gPnJioVa0iaqpGzAo8hDBHbYR6r82NlfgFEZtI/R+jWl1gDydioW6ruda4UvCPFehM93vUntZEzcC4KnREm1D6Vjma6e8pMk/zXLhFMRFuE4owdTs0Gb/gLkx8Lj17STOC3iCIitHFY1SkUN2eeDuXLAPqIlbLyrgXR/uGKHuyXqksOLsmXvqYYj78Z9Qi0vpPUjBA1Tos1vDn/uJZ5mDt5Yws4bAcxSu9SjzfDiEG20j1HHDirNKzMQGEm8BOAEwNZ5MdABVEA6S3G1L1S4YdRdzlU8GL0rxtYp7f5tZlRlpUsqbBfFvQBlKxyKnJrNTN61NJNohXOM3XN45LjS3U12/4tR5JxbZdVPB/6m5pqqymPip7XExGYuMmTbwX5NFzi48sixUAAAAAElFTkSuQmCC"},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssTextBT",e.className="kssToolbarItemBT",e.title="字体工具";var t=document.createElement("img");return t.className="kssToolbarItemImg",t.src=a.default,A.textBT=e,e.appendChild(t),e.addEventListener("click",function(){if(A.isEdit=!0,"text"!==A.currentToolType){A.currentToolType="text",(0,o.default)(e),(0,s.default)(A,"textLayer"),A.toolmousedown&&(A.rectangleCanvas.removeEventListener("mousedown",A.toolmousedown),document.removeEventListener("mousemove",A.toolmousemove),document.removeEventListener("mouseup",A.toolmouseup));var t=!1;A.textClickEvent||(A.textClickEvent=function(e){if(!t){var o=e.clientX-A.startX,s=e.clientY-A.startY,a=document.createElement("div");a.className="kssTextarea",a.contentEditable=!0,a.tabIndex=-1;var i=0,B=0;A.width-o<60?i=60-(A.width-o):(0,r.css)(a,{"min-width":"60px"}),A.height-s<36?B=36-(A.height-s):(0,r.css)(a,{"min-height":"36px"}),(0,r.css)(a,{position:"absolute",top:s-B+"px",left:o-i+"px","max-width":A.width-o+"px","max-height":A.height-s+"px"}),A.kssTextLayer.appendChild(a),a.addEventListener("focus",function(){t=!0,(0,r.css)(a,{color:A.toolbarColor})}),a.addEventListener("blur",function(e){if(t=!1,""!==a.innerHTML){var l=A.rectangleCanvas.getContext("2d");l.font=16*A.scale+"px 宋体";var c=[];a.innerHTML.split("<div>").forEach(function(e,t){var r=e;t>0&&(r=e.replace("</div>","")),r=r.replace(/&nbsp;|\<br\>/g,"  ");var n=A.width-o>60?A.width-o:60,s=0,a="";Array.prototype.forEach.call(r,function(A,e){(s+=l.measureText(A).width)>=n?(s=l.measureText(A).width,c.push(a),a=A):a+=A}),c.push(a)}),l.fillStyle=A.toolbarColor,c.forEach(function(e,t){l.fillText(e,(o-i)*A.scale,(s-B+15+18*t)*A.scale)}),(0,n.default)(A),(0,r.remove)(a)}else(0,r.remove)(a)}),setTimeout(function(){a.focus()},0)}}),A.kssTextLayer.removeEventListener("mousedown",A.textClickEvent),A.kssTextLayer.addEventListener("mousedown",A.textClickEvent)}}),e};var r=t(0),n=i(t(3)),o=i(t(1)),s=i(t(2)),a=i(t(36));function i(A){return A&&A.__esModule?A:{default:A}}},function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAApUlEQVRIS2NkGCDAOED2MoxaTLeQxxnUHn0/DjAwMtpT5pL/B3YUcjhiM4PWFu/bUcjhTJrF/b8SGBj+K2D18X8GBQZGhnio3AIGBoaH2NT9Z2S8t7OAbRFJFuMLYvfe346MTP/2gdQw/mdy2F7EepDUKCErO41aPBrUxCS00cRFTCgxjGan0exETEIZzU7EhNIIzE5EBQsBRWQlrlGLyQmBAQtqAM8ijR/H6NfmAAAAAElFTkSuQmCC"},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){document.documentElement.clientHeight;var e=document.createElement("span");return e.id="kssToolbarMiddleArea",e.appendChild((0,r.default)(A)),e.appendChild((0,n.default)(A)),e};t(0);var r=o(t(38)),n=o(t(39));function o(A){return A&&A.__esModule?A:{default:A}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssColorBoard",e.title="颜色板",e.tabIndex="-1";var t=document.createElement("span");t.id="kssCurrentColor",(0,r.css)(t,{background:A.toolbarColor}),e.appendChild(t);var o=document.createElement("div");return o.id="kssColorItemWrapper",n.forEach(function(e,s){var a=document.createElement("span");a.className="kssColorItem kss"+e,a.dataset.color=e,(0,r.css)(a,{background:e}),s<=n.length/2-1&&(0,r.css)(a,{"margin-bottom":"2px"}),a.addEventListener("click",function(e){var r=e.currentTarget.dataset.color;A.toolbarColor=r,t.style.background=r}),o.appendChild(a)}),e.appendChild(o),e.addEventListener("focus",function(A){A.currentTarget.style.display="block"}),e.addEventListener("blur",function(A){A.currentTarget.style.display="none"}),e};var r=t(0),n=["#000","#808080","#800000","#f7883a","#308430","#385ad3","#800080","#009999","#fff","#c0c0c0","#fb3838","#ffff00","#99cc00","#3894e4","#f31af3","#16dcdc"]},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(A){var e=document.createElement("span");e.id="kssSetLineWidth",e.tabIndex="-1";var t=document.createElement("div");t.id="kssNumInputWrapper";var n=document.createElement("input");n.id="kssNumInput",n.value=A.toolbarLineWidth,t.appendChild(n),n.addEventListener("input",function(e){var t=parseInt(e.currentTarget.value);t>20?t=20:t<=0&&(t=1),n.value=t,A.toolbarLineWidth=t,(0,r.css)(B,{width:A.toolbarLineWidth+"px"})});var o=document.createElement("span");o.id="kssArrowNumWrapper";var s=document.createElement("div");s.id="kssUpNum",s.innerHTML="▲";var a=document.createElement("div");a.id="kssDownNum",a.innerHTML="▼",s.addEventListener("click",function(){n.value<20&&(n.value=parseInt(n.value)+1,A.toolbarLineWidth=n.value,(0,r.css)(B,{width:A.toolbarLineWidth+"px"}))}),a.addEventListener("click",function(){n.value>1&&(n.value=parseInt(n.value)-1,A.toolbarLineWidth=n.value,(0,r.css)(B,{width:A.toolbarLineWidth+"px"}))}),o.appendChild(s),o.appendChild(a),t.appendChild(o),e.appendChild(t);var i=document.createElement("div");i.id="kssShowLineWidthWrapper";var B=document.createElement("span");return B.id="kssShowLineWidth",(0,r.css)(B,{width:A.toolbarLineWidth+"px",background:"#fb3838"}),i.appendChild(B),e.appendChild(i),e.addEventListener("focus",function(A){A.currentTarget.style.display="block"}),e.addEventListener("blur",function(){setTimeout(function(){n!==document.activeElement&&(e.style.display="none")},0)}),n.addEventListener("blur",function(){setTimeout(function(){e!==document.activeElement&&(e.style.display="none")},0)}),e};var r=t(0)},function(A,e,t){var r=t(41);"string"==typeof r&&(r=[[A.i,r,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};t(44)(r,n);r.locals&&(A.exports=r.locals)},function(A,e,t){var r=t(42);(A.exports=t(43)(!1)).push([A.i,'@charset "UTF-8";\n.kssBody {\n  cursor: url('+r(t(10))+"), auto;\n  user-select: none; }\n  .kssBody #kss {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 10000; }\n  .kssBody #kssScreenShotWrapper {\n    position: fixed;\n    background: transparent;\n    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.3);\n    z-index: 10001; }\n    .kssBody #kssScreenShotWrapper #kssTextLayer {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      z-index: 98;\n      cursor: crosshair; }\n      .kssBody #kssScreenShotWrapper #kssTextLayer .kssTextarea {\n        background: transparent;\n        resize: none;\n        min-width: 60px;\n        min-height: 36px;\n        box-sizing: border-box;\n        border-color: transparent;\n        overflow: hidden;\n        font-family: 宋体; }\n        .kssBody #kssScreenShotWrapper #kssTextLayer .kssTextarea:hover {\n          cursor: text;\n          outline: #488ff9 solid 1px; }\n    .kssBody #kssScreenShotWrapper #kssRectangleCanvas {\n      height: 100%;\n      width: 100%;\n      top: 0;\n      left: 0;\n      cursor: move;\n      position: absolute;\n      z-index: 99; }\n    .kssBody #kssScreenShotWrapper .kssDot, .kssBody #kssScreenShotWrapper .kssLine {\n      position: absolute;\n      background: #488ff9;\n      z-index: 100; }\n    .kssBody #kssScreenShotWrapper #kssCurrentImgDom {\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: 0;\n      left: 0;\n      display: none; }\n    .kssBody #kssScreenShotWrapper #kssToolbar {\n      position: absolute;\n      right: 0;\n      background: #f1f1f1;\n      font-size: 14px;\n      border: 1px solid #dedede;\n      border-radius: 4px;\n      box-sizing: border-box;\n      z-index: 100; }\n      .kssBody #kssScreenShotWrapper #kssToolbar .kssToolbarItemBT {\n        display: inline-block;\n        width: 30px;\n        height: 28px;\n        text-align: center;\n        float: right;\n        cursor: pointer; }\n        .kssBody #kssScreenShotWrapper #kssToolbar .kssToolbarItemBT:hover {\n          background: #dedede; }\n        .kssBody #kssScreenShotWrapper #kssToolbar .kssToolbarItemBT .kssToolbarItemImg {\n          width: 20px;\n          height: 20px;\n          margin-top: 5px; }\n      .kssBody #kssScreenShotWrapper #kssToolbar .kssToolbarActiveItemBT {\n        background: #dedede; }\n      .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssColorBoard {\n        position: absolute;\n        width: 180px;\n        height: 40px;\n        right: 0;\n        background: #fff;\n        border: 1px solid #bbb;\n        border-radius: 4px;\n        display: none;\n        outline: none;\n        cursor: default;\n        z-index: 100; }\n        .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssColorBoard #kssCurrentColor {\n          display: inline-block;\n          width: 30px;\n          height: 30px;\n          margin: 5px 8px 0 8px;\n          box-sizing: border-box;\n          border: 1px solid #333; }\n        .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssColorBoard #kssColorItemWrapper {\n          display: inline-block;\n          vertical-align: top;\n          width: 130px;\n          margin-top: 5px;\n          font-size: 0; }\n          .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssColorBoard #kssColorItemWrapper .kssColorItem {\n            display: inline-block;\n            width: 14px;\n            height: 14px;\n            margin-right: 2px;\n            box-sizing: border-box;\n            border: 1px solid #333;\n            cursor: pointer; }\n      .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth {\n        position: absolute;\n        width: 155px;\n        height: 40px;\n        right: 0;\n        background: #fff;\n        border: 1px solid #bbb;\n        border-radius: 4px;\n        display: none;\n        outline: none;\n        cursor: default;\n        z-index: 100; }\n        .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper {\n          margin: 7px 0 0 8px;\n          position: relative;\n          display: inline-block; }\n          .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper #kssNumInput {\n            width: 40px;\n            height: 24px;\n            border: 1px solid #bbb;\n            border-radius: 4px;\n            padding: 0 15px 0 8px; }\n          .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper #kssArrowNumWrapper {\n            position: absolute;\n            right: 0;\n            top: 1px;\n            border-radius: 0 4px 4px 0;\n            font-size: 0;\n            line-height: 12px; }\n            .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper #kssArrowNumWrapper #kssUpNum, .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper #kssArrowNumWrapper #kssDownNum {\n              height: 12px;\n              font-size: 12px;\n              cursor: pointer; }\n              .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper #kssArrowNumWrapper #kssUpNum:hover, .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssNumInputWrapper #kssArrowNumWrapper #kssDownNum:hover {\n                background: #dedede; }\n        .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssShowLineWidthWrapper {\n          display: inline-block;\n          height: 40px;\n          line-height: 40px;\n          vertical-align: top;\n          width: 80px;\n          text-align: center; }\n          .kssBody #kssScreenShotWrapper #kssToolbar #kssToolbarMiddleArea #kssSetLineWidth #kssShowLineWidthWrapper #kssShowLineWidth {\n            height: 20px;\n            display: inline-block;\n            vertical-align: middle; }\n",""])},function(A,e){A.exports=function(A){return"string"!=typeof A?A:(/^['"].*['"]$/.test(A)&&(A=A.slice(1,-1)),/["'() \t\n]/.test(A)?'"'+A.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':A)}},function(A,e){A.exports=function(A){var e=[];return e.toString=function(){return this.map(function(e){var t=function(A,e){var t=A[1]||"",r=A[3];if(!r)return t;if(e&&"function"==typeof btoa){var n=function(A){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(A))))+" */"}(r),o=r.sources.map(function(A){return"/*# sourceURL="+r.sourceRoot+A+" */"});return[t].concat(o).concat([n]).join("\n")}return[t].join("\n")}(e,A);return e[2]?"@media "+e[2]+"{"+t+"}":t}).join("")},e.i=function(A,t){"string"==typeof A&&(A=[[null,A,""]]);for(var r={},n=0;n<this.length;n++){var o=this[n][0];"number"==typeof o&&(r[o]=!0)}for(n=0;n<A.length;n++){var s=A[n];"number"==typeof s[0]&&r[s[0]]||(t&&!s[2]?s[2]=t:t&&(s[2]="("+s[2]+") and ("+t+")"),e.push(s))}},e}},function(A,e,t){var r={},n=function(A){var e;return function(){return void 0===e&&(e=A.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),o=function(A){var e={};return function(A){if("function"==typeof A)return A();if(void 0===e[A]){var t=function(A){return document.querySelector(A)}.call(this,A);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(A){t=null}e[A]=t}return e[A]}}(),s=null,a=0,i=[],B=t(45);function l(A,e){for(var t=0;t<A.length;t++){var n=A[t],o=r[n.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](n.parts[s]);for(;s<n.parts.length;s++)o.parts.push(g(n.parts[s],e))}else{var a=[];for(s=0;s<n.parts.length;s++)a.push(g(n.parts[s],e));r[n.id]={id:n.id,refs:1,parts:a}}}}function c(A,e){for(var t=[],r={},n=0;n<A.length;n++){var o=A[n],s=e.base?o[0]+e.base:o[0],a={css:o[1],media:o[2],sourceMap:o[3]};r[s]?r[s].parts.push(a):t.push(r[s]={id:s,parts:[a]})}return t}function u(A,e){var t=o(A.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=i[i.length-1];if("top"===A.insertAt)r?r.nextSibling?t.insertBefore(e,r.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),i.push(e);else if("bottom"===A.insertAt)t.appendChild(e);else{if("object"!=typeof A.insertAt||!A.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=o(A.insertInto+" "+A.insertAt.before);t.insertBefore(e,n)}}function d(A){if(null===A.parentNode)return!1;A.parentNode.removeChild(A);var e=i.indexOf(A);e>=0&&i.splice(e,1)}function w(A){var e=document.createElement("style");return void 0===A.attrs.type&&(A.attrs.type="text/css"),Q(e,A.attrs),u(A,e),e}function Q(A,e){Object.keys(e).forEach(function(t){A.setAttribute(t,e[t])})}function g(A,e){var t,r,n,o;if(e.transform&&A.css){if(!(o=e.transform(A.css)))return function(){};A.css=o}if(e.singleton){var i=a++;t=s||(s=w(e)),r=f.bind(null,t,i,!1),n=f.bind(null,t,i,!0)}else A.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=function(A){var e=document.createElement("link");return void 0===A.attrs.type&&(A.attrs.type="text/css"),A.attrs.rel="stylesheet",Q(e,A.attrs),u(A,e),e}(e),r=function(A,e,t){var r=t.css,n=t.sourceMap,o=void 0===e.convertToAbsoluteUrls&&n;(e.convertToAbsoluteUrls||o)&&(r=B(r));n&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var s=new Blob([r],{type:"text/css"}),a=A.href;A.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,t,e),n=function(){d(t),t.href&&URL.revokeObjectURL(t.href)}):(t=w(e),r=function(A,e){var t=e.css,r=e.media;r&&A.setAttribute("media",r);if(A.styleSheet)A.styleSheet.cssText=t;else{for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(document.createTextNode(t))}}.bind(null,t),n=function(){d(t)});return r(A),function(e){if(e){if(e.css===A.css&&e.media===A.media&&e.sourceMap===A.sourceMap)return;r(A=e)}else n()}}A.exports=function(A,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=n()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=c(A,e);return l(t,e),function(A){for(var n=[],o=0;o<t.length;o++){var s=t[o];(a=r[s.id]).refs--,n.push(a)}A&&l(c(A,e),e);for(o=0;o<n.length;o++){var a;if(0===(a=n[o]).refs){for(var i=0;i<a.parts.length;i++)a.parts[i]();delete r[a.id]}}}};var h=function(){var A=[];return function(e,t){return A[e]=t,A.filter(Boolean).join("\n")}}();function f(A,e,t,r){var n=t?"":r.css;if(A.styleSheet)A.styleSheet.cssText=h(e,n);else{var o=document.createTextNode(n),s=A.childNodes;s[e]&&A.removeChild(s[e]),s.length?A.insertBefore(o,s[e]):A.appendChild(o)}}},function(A,e){A.exports=function(A){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!A||"string"!=typeof A)return A;var t=e.protocol+"//"+e.host,r=t+e.pathname.replace(/\/[^\/]*$/,"/");return A.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(A,e){var n,o=e.trim().replace(/^"(.*)"$/,function(A,e){return e}).replace(/^'(.*)'$/,function(A,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?A:(n=0===o.indexOf("//")?o:0===o.indexOf("/")?t+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")})}}]).default});

/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),

/***/ "e91f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $indexOf = __webpack_require__("4d64").indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "ebb5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var has = __webpack_require__("5135");
var classof = __webpack_require__("f5df");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var defineProperty = __webpack_require__("9bf2").f;
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var wellKnownSymbol = __webpack_require__("b622");
var uid = __webpack_require__("90e3");

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "ec26":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ var regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ var esm_browser_validate = (validate);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var stringify_i = 0; stringify_i < 256; ++stringify_i) {
  byteToHex.push((stringify_i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ var esm_browser_stringify = (stringify);
// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ var esm_browser_v4 = __webpack_exports__["a"] = (v4);

/***/ }),

/***/ "ef5f":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=126)}([function(t,e){t.exports=function(t){return t&&t.__esModule?t:{default:t}}},function(t,e,n){t.exports=n(127)},function(t,e,n){"use strict";var o=n(0),r=o(n(108)),i=o(n(81)),a=o(n(82)),u=o(n(50)),l=o(n(109)),c=o(n(23)),s=o(n(40)),f=o(n(6)),d=o(n(113)),p=o(n(1));(0,p.default)(e,"__esModule",{value:!0}),e.DomElement=void 0;var A=n(7),h=[];function v(t){var e=[],n=[];return e=(0,d.default)(t)?t:t.split(";"),(0,f.default)(e).call(e,(function(t){var e,o=(0,s.default)(e=t.split(":")).call(e,(function(t){return(0,c.default)(t).call(t)}));2===o.length&&n.push(o[0]+":"+o[1])})),n}var g=function(){function t(e){if(this.selector="",this.elems=[],this.length=this.elems.length,this.dataSource=new l.default,e){if(e instanceof t)return e;var n=[];this.selector=e;var o=e.nodeType;if(9===o)n=[e];else if(1===o)n=[e];else if(function(t){return!!t&&(t instanceof HTMLCollection||t instanceof NodeList)}(e))n=A.toArray(e);else if(e instanceof Array)n=e;else if("string"==typeof e){var r;e=(0,c.default)(r=e.replace("/\n/mg","")).call(r),n=0===(0,u.default)(e).call(e,"<")?function(t){var e=document.createElement("div");e.innerHTML=t;var n=e.children;return A.toArray(n)}(e):function(t){var e=document.querySelectorAll(t);return A.toArray(e)}(e)}var i=n.length;if(!i)return this;for(var a=0;a<i;a++)this.elems.push(n[a]);this.length=i}}return(0,p.default)(t.prototype,"id",{get:function(){return this.elems[0].id},enumerable:!1,configurable:!0}),t.prototype.forEach=function(t){for(var e=0;e<this.length;e++){var n=this.elems[e];if(!1===t.call(n,n,e))break}return this},t.prototype.clone=function(t){var e;void 0===t&&(t=!1);var n=[];return(0,f.default)(e=this.elems).call(e,(function(e){n.push(e.cloneNode(!!t))})),m(n)},t.prototype.get=function(t){void 0===t&&(t=0);var e=this.length;return t>=e&&(t%=e),m(this.elems[t])},t.prototype.first=function(){return this.get(0)},t.prototype.last=function(){var t=this.length;return this.get(t-1)},t.prototype.on=function(t,e,n){var o;return t?("function"==typeof e&&(n=e,e=""),(0,f.default)(o=this).call(o,(function(o){if(e){var r=function(t){var o=t.target;o.matches(e)&&n.call(o,t)};o.addEventListener(t,r),h.push({elem:o,selector:e,fn:n,agentFn:r})}else o.addEventListener(t,n)}))):this},t.prototype.off=function(t,e,n){var o;return t?("function"==typeof e&&(n=e,e=""),(0,f.default)(o=this).call(o,(function(o){if(e){for(var r=-1,i=0;i<h.length;i++){var u=h[i];if(u.selector===e&&u.fn===n&&u.elem===o){r=i;break}}if(-1!==r){var l=(0,a.default)(h).call(h,r,1)[0].agentFn;o.removeEventListener(t,l)}}else o.removeEventListener(t,n)}))):this},t.prototype.attr=function(t,e){var n;return null==e?this.elems[0].getAttribute(t)||"":(0,f.default)(n=this).call(n,(function(n){n.setAttribute(t,e)}))},t.prototype.removeAttr=function(t){var e;(0,f.default)(e=this).call(e,(function(e){e.removeAttribute(t)}))},t.prototype.addClass=function(t){var e;return t?(0,f.default)(e=this).call(e,(function(e){if(e.className){var n=e.className.split(/\s/);n=(0,i.default)(n).call(n,(function(t){return!!(0,c.default)(t).call(t)})),(0,u.default)(n).call(n,t)<0&&n.push(t),e.className=n.join(" ")}else e.className=t})):this},t.prototype.removeClass=function(t){var e;return t?(0,f.default)(e=this).call(e,(function(e){if(e.className){var n=e.className.split(/\s/);n=(0,i.default)(n).call(n,(function(e){return!(!(e=(0,c.default)(e).call(e))||e===t)})),e.className=n.join(" ")}})):this},t.prototype.hasClass=function(t){if(void 0===t&&(t=""),!t)return!1;var e=this.elems[0];if(!e.className)return!1;var n=e.className.split(/\s/);return(0,r.default)(n).call(n,t)},t.prototype.css=function(t,e){var n,o;return o=""==e?"":t+":"+e+";",(0,f.default)(n=this).call(n,(function(e){var n,r=(0,c.default)(n=e.getAttribute("style")||"").call(n);if(r){var i=v(r);i=(0,s.default)(i).call(i,(function(e){return 0===(0,u.default)(e).call(e,t)?o:e})),""!=o&&(0,u.default)(i).call(i,o)<0&&i.push(o),""==o&&(i=v(i)),e.setAttribute("style",i.join("; "))}else e.setAttribute("style",o)}))},t.prototype.getBoundingClientRect=function(){return this.elems[0].getBoundingClientRect()},t.prototype.show=function(){return this.css("display","block")},t.prototype.hide=function(){return this.css("display","none")},t.prototype.children=function(){var t=this.elems[0];return t?m(t.children):null},t.prototype.childNodes=function(){var t=this.elems[0];return t?m(t.childNodes):null},t.prototype.append=function(t){var e;return(0,f.default)(e=this).call(e,(function(e){(0,f.default)(t).call(t,(function(t){e.appendChild(t)}))}))},t.prototype.remove=function(){var t;return(0,f.default)(t=this).call(t,(function(t){if(t.remove)t.remove();else{var e=t.parentElement;e&&e.removeChild(t)}}))},t.prototype.isContain=function(t){var e=this.elems[0],n=t.elems[0];return e.contains(n)},t.prototype.getSizeData=function(){return this.elems[0].getBoundingClientRect()},t.prototype.getNodeName=function(){return this.elems[0].nodeName},t.prototype.getClientHeight=function(){return this.elems[0].clientHeight},t.prototype.find=function(t){return m(this.elems[0].querySelectorAll(t))},t.prototype.text=function(t){var e;return t?(0,f.default)(e=this).call(e,(function(e){e.innerHTML=t})):this.elems[0].innerHTML.replace(/<[^>]+>/g,(function(){return""}))},t.prototype.html=function(t){var e=this.elems[0];return t?(e.innerHTML=t,this):e.innerHTML},t.prototype.val=function(){var t,e=this.elems[0];return(0,c.default)(t=e.value).call(t)},t.prototype.focus=function(){var t;return(0,f.default)(t=this).call(t,(function(t){t.focus()}))},t.prototype.prev=function(){return m(this.elems[0].previousElementSibling)},t.prototype.next=function(){return m(this.elems[0].nextElementSibling)},t.prototype.parent=function(){return m(this.elems[0].parentElement)},t.prototype.parentUntil=function(t,e){var n=e||this.elems[0];if("BODY"===n.nodeName)return null;var o=n.parentElement;return null==o?null:o.matches(t)?m(o):this.parentUntil(t,o)},t.prototype.equal=function(e){return e instanceof t?this.elems[0]===e.elems[0]:e instanceof HTMLElement&&this.elems[0]===e},t.prototype.insertBefore=function(t){var e,n=m(t).elems[0];return n?(0,f.default)(e=this).call(e,(function(t){n.parentNode.insertBefore(t,n)})):this},t.prototype.insertAfter=function(t){var e,n=m(t).elems[0],o=n&&n.nextSibling;return n?(0,f.default)(e=this).call(e,(function(t){var e=n.parentNode;o?e.insertBefore(t,o):e.appendChild(t)})):this},t.prototype.data=function(t,e){if(null==e)return this.dataSource.get(t);this.dataSource.set(t,e)},t.prototype.getNodeTop=function(t){if(this.length<1)return this;var e=this.parent();return t.$textElem.equal(e)?this:e.getNodeTop(t)},t.prototype.getOffsetData=function(){var t=this.elems[0];return{top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight,parent:t.offsetParent}},t}();function m(t){return new g(t)}e.DomElement=g,e.default=m},function(t,e,n){t.exports=n(174)},function(t,e,n){t.exports=n(297)},function(t,e,n){"use strict";var o=n(8),r=n(65).f,i=n(90),a=n(11),u=n(44),l=n(18),c=n(15),s=function(t){var e=function(e,n,o){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,o)}return t.apply(this,arguments)};return e.prototype=t.prototype,e};t.exports=function(t,e){var n,f,d,p,A,h,v,g,m=t.target,y=t.global,w=t.stat,x=t.proto,b=y?o:w?o[m]:(o[m]||{}).prototype,E=y?a:a[m]||(a[m]={}),_=E.prototype;for(d in e)n=!i(y?d:m+(w?".":"#")+d,t.forced)&&b&&c(b,d),A=E[d],n&&(h=t.noTargetGet?(g=r(b,d))&&g.value:b[d]),p=n&&h?h:e[d],n&&typeof A==typeof p||(v=t.bind&&n?u(p,o):t.wrap&&n?s(p):x&&"function"==typeof p?u(Function.call,p):p,(t.sham||p&&p.sham||A&&A.sham)&&l(v,"sham",!0),E[d]=v,x&&(c(a,f=m+"Prototype")||l(a,f,{}),a[f][d]=p,t.real&&_&&!_[d]&&l(_,d,p)))}},function(t,e,n){t.exports=n(169)},function(t,e,n){"use strict";var o=n(0),r=o(n(113)),i=o(n(114)),a=o(n(118)),u=o(n(63)),l=o(n(249)),c=o(n(1)),s=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var o=Array(t),r=0;for(e=0;e<n;e++)for(var i=arguments[e],a=0,u=i.length;a<u;a++,r++)o[r]=i[a];return o};(0,c.default)(e,"__esModule",{value:!0}),e.toArray=e.deepClone=e.isFunction=e.debounce=e.throttle=e.arrForEach=e.forEach=e.replaceSpecialSymbol=e.replaceHtmlSymbol=e.getRandom=e.UA=void 0;var f=function(){function t(){this._ua=navigator.userAgent;var t=this._ua.match(/(Edge?)\/(\d+)/);this.isOldEdge=!!(t&&"Edge"==t[1]&&(0,l.default)(t[2])<19),this.isFirefox=!(!/Firefox\/\d+/.test(this._ua)||/Seamonkey\/\d+/.test(this._ua))}return t.prototype.isIE=function(){return"ActiveXObject"in window},t.prototype.isWebkit=function(){return/webkit/i.test(this._ua)},t}();e.UA=new f,e.getRandom=function(t){var e;return void 0===t&&(t=""),t+(0,u.default)(e=Math.random().toString()).call(e,2)},e.replaceHtmlSymbol=function(t){return t.replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;").replace(/(\r\n|\r|\n)/g,"<br/>")},e.replaceSpecialSymbol=function(t){return t.replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"')},e.forEach=function(t,e){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n))if(!1===e(n,t[n]))break}},e.arrForEach=function(t,e){var n,o,r=t.length||0;for(n=0;n<r&&(o=t[n],!1!==e.call(t,o,n));n++);},e.throttle=function(t,e){void 0===e&&(e=200);var n=!1;return function(){for(var o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];n||(n=!0,(0,a.default)((function(){n=!1,t.call.apply(t,s([null],o))}),e))}},e.debounce=function(t,e){void 0===e&&(e=200);var n=0;return function(){for(var o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];n&&window.clearTimeout(n),n=window.setTimeout((function(){n=0,t.call.apply(t,s([null],o))}),e)}},e.isFunction=function(t){return"function"==typeof t},e.deepClone=function t(e){if("object"!==(0,i.default)(e)||"function"==typeof e||null===e)return e;var n;for(var o in(0,r.default)(e)&&(n=[]),(0,r.default)(e)||(n={}),e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=t(e[o]));return n},e.toArray=function(t){return(0,u.default)(Array.prototype).call(t)}},function(t,e,n){(function(e){var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||Function("return this")()}).call(this,n(130))},function(t,e,n){var o=n(8),r=n(68),i=n(15),a=n(57),u=n(70),l=n(95),c=r("wks"),s=o.Symbol,f=l?s:s&&s.withoutSetter||a;t.exports=function(t){return i(c,t)||(u&&i(s,t)?c[t]=s[t]:c[t]=f("Symbol."+t)),c[t]}},function(t,e,n){var o=n(11),r=n(15),i=n(85),a=n(16).f;t.exports=function(t){var e=o.Symbol||(o.Symbol={});r(e,t)||a(e,t,{value:i.f(t)})}},function(t,e){t.exports={}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var o=n(12);t.exports=!o((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var o=n(14),r=n(89),i=n(20),a=n(52),u=Object.defineProperty;e.f=o?u:function(t,e,n){if(i(t),e=a(e,!0),i(n),r)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var o=n(11);t.exports=function(t){return o[t+"Prototype"]}},function(t,e,n){var o=n(14),r=n(16),i=n(42);t.exports=o?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(6)),a=r(n(1)),u=r(n(3)),l=r(n(4)),c=(o=function(t,e){return(o=l.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,u.default)(e):(n.prototype=e.prototype,new n)}),s=function(t){return t&&t.__esModule?t:{default:t}};(0,a.default)(e,"__esModule",{value:!0});var f=s(n(2)),d=s(n(86)),p=s(n(123)),A=function(t){function e(e,n,o){var r=t.call(this,e,n)||this;o.title=n.i18next.t("menus.dropListMenu."+o.title);var a,u="zh-CN"===n.config.lang?"":"w-e-drop-list-tl";""!==u&&"list"===o.type&&(0,i.default)(a=o.list).call(a,(function(t){var e=t.$elem,n=f.default(e.children());if(n.length>0){var o=null==n?void 0:n.getNodeName();o&&"I"===o&&e.addClass(u)}}));var l=new p.default(r,o);return r.dropList=l,e.on("mouseenter",(function(){var t;null!=n.selection.getRange()&&(e.css("z-index",n.zIndex.get("menu")),(0,i.default)(t=n.txt.eventHooks.dropListMenuHoverEvents).call(t,(function(t){return t()})),l.showTimeoutId=window.setTimeout((function(){l.show()}),200))})).on("mouseleave",(function(){e.css("z-index","auto"),l.hideTimeoutId=window.setTimeout((function(){l.hide()}))})),r}return c(e,t),e}(d.default);e.default=A},function(t,e,n){var o=n(13);t.exports=function(t){if(!o(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e,n){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),a=[];function u(t){for(var e=-1,n=0;n<a.length;n++)if(a[n].identifier===t){e=n;break}return e}function l(t,e){for(var n={},o=[],r=0;r<t.length;r++){var i=t[r],l=e.base?i[0]+e.base:i[0],c=n[l]||0,s="".concat(l," ").concat(c);n[l]=c+1;var f=u(s),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:s,updater:v(d,e),references:1}),o.push(s)}return o}function c(t){var e=document.createElement("style"),o=t.attributes||{};if(void 0===o.nonce){var r=n.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(t){e.setAttribute(t,o[t])})),"function"==typeof t.insert)t.insert(e);else{var a=i(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var s,f=(s=[],function(t,e){return s[t]=e,s.filter(Boolean).join("\n")});function d(t,e,n,o){var r=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(t.styleSheet)t.styleSheet.cssText=f(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function p(t,e,n){var o=n.css,r=n.media,i=n.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),i&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var A=null,h=0;function v(t,e){var n,o,r;if(e.singleton){var i=h++;n=A||(A=c(e)),o=d.bind(null,n,i,!1),r=d.bind(null,n,i,!0)}else n=c(e),o=p.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var n=l(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var o=0;o<n.length;o++){var r=u(n[o]);a[r].references--}for(var i=l(t,e),c=0;c<n.length;c++){var s=u(n[c]);0===a[s].references&&(a[s].updater(),a.splice(s,1))}n=i}}}},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(a=o,u=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(l," */")),i=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(t," */")}));return[n].concat(i).concat([r]).join("\n")}var a,u,l;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,o){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(r[a]=!0)}for(var u=0;u<t.length;u++){var l=[].concat(t[u]);o&&r[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),e.push(l))}},e}},function(t,e,n){t.exports=n(202)},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=function(t){function e(e,n){return t.call(this,e,n)||this}return l(e,t),e}(c(n(86)).default);e.default=s},function(t,e,n){var o=n(66),r=n(43);t.exports=function(t){return o(r(t))}},function(t,e,n){var o=n(14),r=n(12),i=n(15),a=Object.defineProperty,u={},l=function(t){throw t};t.exports=function(t,e){if(i(u,t))return u[t];e||(e={});var n=[][t],c=!!i(e,"ACCESSORS")&&e.ACCESSORS,s=i(e,0)?e[0]:l,f=i(e,1)?e[1]:void 0;return u[t]=!!n&&!r((function(){if(c&&!o)return!0;var t={length:-1};c?a(t,1,{enumerable:!0,get:l}):t[1]=1,n.call(t,s,f)}))}},function(t,e,n){"use strict";var o=n(0),r=o(n(121)),i=o(n(64)),a=o(n(6)),u=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var l=u(n(2)),c=n(30),s=function(){function t(e,n){this.menu=e,this.conf=n,this.$container=l.default('<div class="w-e-panel-container"></div>');var o=e.editor;o.txt.eventHooks.clickEvents.push(t.hideCurAllPanels),o.txt.eventHooks.toolbarClickEvents.push(t.hideCurAllPanels),o.txt.eventHooks.dropListMenuHoverEvents.push(t.hideCurAllPanels)}return t.prototype.create=function(){var e=this,n=this.menu;if(!t.createdMenus.has(n)){var o=this.conf,r=this.$container,u=o.width||300,s=n.editor.$toolbarElem.getBoundingClientRect(),f=n.$elem.getBoundingClientRect(),d=s.height+s.top-f.top,p=(s.width-u)/2+s.left-f.left;r.css("width",u+"px").css("margin-top",d+"px").css("margin-left",p+"px").css("z-index",n.editor.zIndex.get("panel"));var A=l.default('<i class="w-e-icon-close w-e-panel-close"></i>');r.append(A),A.on("click",(function(){e.remove()}));var h=l.default('<ul class="w-e-panel-tab-title"></ul>'),v=l.default('<div class="w-e-panel-tab-content"></div>');r.append(h).append(v);var g=o.height;g&&v.css("height",g+"px").css("overflow-y","auto");var m=o.tabs||[],y=[],w=[];(0,a.default)(m).call(m,(function(t,e){if(t){var n=t.title||"",o=t.tpl||"",r=l.default('<li class="w-e-item">'+n+"</li>");h.append(r);var i=l.default(o);v.append(i),y.push(r),w.push(i),0===e?(r.data("active",!0),r.addClass("w-e-active")):i.hide(),r.on("click",(function(){r.data("active")||((0,a.default)(y).call(y,(function(t){t.data("active",!1),t.removeClass("w-e-active")})),(0,a.default)(w).call(w,(function(t){t.hide()})),r.data("active",!0),r.addClass("w-e-active"),i.show())}))}})),r.on("click",(function(t){t.stopPropagation()})),n.$elem.append(r),(0,a.default)(m).call(m,(function(t,n){if(t){var o=t.events||[];(0,a.default)(o).call(o,(function(t){var o=t.selector,r=t.type,a=t.fn||c.EMPTY_FN,u=w[n];(0,i.default)(u).call(u,o).on(r,(function(t){t.stopPropagation(),a(t)&&e.remove()}))}))}}));var x=(0,i.default)(r).call(r,"input[type=text],textarea");x.length&&x.get(0).focus(),t.hideCurAllPanels(),n.setPanel(this),t.createdMenus.add(n)}},t.prototype.remove=function(){var e=this.menu,n=this.$container;n&&n.remove(),t.createdMenus.delete(e)},t.hideCurAllPanels=function(){var e;0!==t.createdMenus.size&&(0,a.default)(e=t.createdMenus).call(e,(function(t){var e=t.panel;e&&e.remove()}))},t.createdMenus=new r.default,t}();e.default=s},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var o=n(74),r=n(16).f,i=n(18),a=n(15),u=n(155),l=n(9)("toStringTag");t.exports=function(t,e,n,c){if(t){var s=n?t:t.prototype;a(s,l)||r(s,l,{configurable:!0,value:e}),c&&!o&&i(s,"toString",u)}}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.urlRegex=e.imgRegex=e.EMPTY_FN=void 0,e.EMPTY_FN=function(){},e.imgRegex=/\.(gif|jpg|jpeg|png)$/i,e.urlRegex=/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=function(t){function e(e,n){return t.call(this,e,n)||this}return l(e,t),e.prototype.setPanel=function(t){this.panel=t},e}(c(n(86)).default);e.default=s},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e,n){var o,r,i,a=n(150),u=n(8),l=n(13),c=n(18),s=n(15),f=n(56),d=n(45),p=u.WeakMap;if(a){var A=new p,h=A.get,v=A.has,g=A.set;o=function(t,e){return g.call(A,t,e),e},r=function(t){return h.call(A,t)||{}},i=function(t){return v.call(A,t)}}else{var m=f("state");d[m]=!0,o=function(t,e){return c(t,m,e),e},r=function(t){return s(t,m)?t[m]:{}},i=function(t){return s(t,m)}}t.exports={set:o,get:r,has:i,enforce:function(t){return i(t)?r(t):o(t,{})},getterFor:function(t){return function(e){var n;if(!l(e)||(n=r(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,e){t.exports=!0},function(t,e,n){var o=n(43);t.exports=function(t){return Object(o(t))}},function(t,e,n){var o=n(55),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},function(t,e,n){var o=n(11),r=n(8),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?i(o[t])||i(r[t]):o[t]&&o[t][e]||r[t]&&r[t][e]}},function(t,e){t.exports={}},function(t,e,n){var o=n(44),r=n(66),i=n(35),a=n(36),u=n(80),l=[].push,c=function(t){var e=1==t,n=2==t,c=3==t,s=4==t,f=6==t,d=5==t||f;return function(p,A,h,v){for(var g,m,y=i(p),w=r(y),x=o(A,h,3),b=a(w.length),E=0,_=v||u,M=e?_(p,b):n?_(p,0):void 0;b>E;E++)if((d||E in w)&&(m=x(g=w[E],E,y),t))if(e)M[E]=m;else if(m)switch(t){case 3:return!0;case 5:return g;case 6:return E;case 2:l.call(M,g)}else if(s)return!1;return f?-1:c||s?s:M}};t.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6)}},function(t,e,n){t.exports=n(207)},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=o(n(1)),a=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var u=a(n(2)),l=function(){function t(t,e,n){this.editor=t,this.$targetElem=e,this.conf=n,this._show=!1,this._isInsertTextContainer=!1;var o=u.default("<div></div>");o.addClass("w-e-tooltip"),this.$container=o}return t.prototype.getPositionData=function(){var t=this.$container,e=0,n=0,o=document.documentElement.scrollTop,r=this.$targetElem.getBoundingClientRect(),i=this.editor.$textElem.getBoundingClientRect(),a=this.$targetElem.getOffsetData(),l=u.default(a.parent),c=this.editor.$textElem.elems[0].scrollTop;if(this._isInsertTextContainer=l.equal(this.editor.$textContainerElem),this._isInsertTextContainer){var s=l.getClientHeight(),f=a.top,d=a.left,p=a.height,A=f-c;A>25?(e=A-20-15,t.addClass("w-e-tooltip-up")):A+p+20<s?(e=A+p+10,t.addClass("w-e-tooltip-down")):(e=(A>0?A:0)+20+10,t.addClass("w-e-tooltip-down")),n=d<0?0:d}else r.top<20||r.top-i.top<20?(e=r.bottom+o+5,t.addClass("w-e-tooltip-down")):(e=r.top+o-20-15,t.addClass("w-e-tooltip-up")),n=r.left<0?0:r.left;return{top:e,left:n}},t.prototype.appendMenus=function(){var t=this,e=this.conf,n=this.editor,o=this.$targetElem,i=this.$container;e.length;(0,r.default)(e).call(e,(function(e,r){var a=e.$elem,l=u.default("<div></div>");l.addClass("w-e-tooltip-item-wrapper "),l.append(a),i.append(l),a.on("click",(function(r){r.preventDefault(),e.onClick(n,o)&&t.remove()}))}))},t.prototype.create=function(){var t=this.editor,e=this.$container;this.appendMenus();var n=this.getPositionData(),o=n.top,r=n.left;e.css("top",o+"px"),e.css("left",r+"px"),e.css("z-index",t.zIndex.get("tooltip")),this._isInsertTextContainer?this.editor.$textContainerElem.append(e):u.default("body").append(e),this._show=!0},t.prototype.remove=function(){this.$container.remove(),this._show=!1},(0,i.default)(t.prototype,"isShow",{get:function(){return this._show},enumerable:!1,configurable:!0}),t}();e.default=l},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var o=n(32);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports={}},function(t,e,n){var o=n(18);t.exports=function(t,e,n,r){r&&r.enumerable?t[e]=n:o(t,e,n)}},function(t,e,n){n(157);var o=n(158),r=n(8),i=n(60),a=n(18),u=n(38),l=n(9)("toStringTag");for(var c in o){var s=r[c],f=s&&s.prototype;f&&i(f)!==l&&a(f,l,c),u[c]=u.Array}},function(t,e,n){var o=n(28);t.exports=Array.isArray||function(t){return"Array"==o(t)}},function(t,e,n){var o=n(12),r=n(9),i=n(79),a=r("species");t.exports=function(t){return i>=51||!o((function(){var e=[];return(e.constructor={})[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},function(t,e,n){t.exports=n(194)},function(t,e,n){"use strict";var o={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!o.call({1:2},1);e.f=i?function(t){var e=r(this,t);return!!e&&e.enumerable}:o},function(t,e,n){var o=n(13);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){},function(t,e,n){"use strict";var o=n(149).charAt,r=n(33),i=n(69),a=r.set,u=r.getterFor("String Iterator");i(String,"String",(function(t){a(this,{type:"String Iterator",string:String(t),index:0})}),(function(){var t,e=u(this),n=e.string,r=e.index;return r>=n.length?{value:void 0,done:!0}:(t=o(n,r),e.index+=t.length,{value:t,done:!1})}))},function(t,e){var n=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:n)(t)}},function(t,e,n){var o=n(68),r=n(57),i=o("keys");t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+o).toString(36)}},function(t,e,n){var o,r=n(20),i=n(154),a=n(73),u=n(45),l=n(97),c=n(67),s=n(56),f=s("IE_PROTO"),d=function(){},p=function(t){return"<script>"+t+"<\/script>"},A=function(){try{o=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;A=o?function(t){t.write(p("")),t.close();var e=t.parentWindow.Object;return t=null,e}(o):((e=c("iframe")).style.display="none",l.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(p("document.F=Object")),t.close(),t.F);for(var n=a.length;n--;)delete A.prototype[a[n]];return A()};u[f]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(d.prototype=r(t),n=new d,d.prototype=null,n[f]=t):n=A(),void 0===e?n:i(n,e)}},function(t,e,n){var o=n(96),r=n(73);t.exports=Object.keys||function(t){return o(t,r)}},function(t,e,n){var o=n(74),r=n(28),i=n(9)("toStringTag"),a="Arguments"==r(function(){return arguments}());t.exports=o?r:function(t){var e,n,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:a?r(e):"Object"==(o=r(e))&&"function"==typeof e.callee?"Arguments":o}},function(t,e,n){var o=n(20),r=n(160),i=n(36),a=n(44),u=n(161),l=n(162),c=function(t,e){this.stopped=t,this.result=e};(t.exports=function(t,e,n,s,f){var d,p,A,h,v,g,m,y=a(e,n,s?2:1);if(f)d=t;else{if("function"!=typeof(p=u(t)))throw TypeError("Target is not iterable");if(r(p)){for(A=0,h=i(t.length);h>A;A++)if((v=s?y(o(m=t[A])[0],m[1]):y(t[A]))&&v instanceof c)return v;return new c(!1)}d=p.call(t)}for(g=d.next;!(m=g.call(d)).done;)if("object"==typeof(v=l(d,y,m.value,s))&&v&&v instanceof c)return v;return new c(!1)}).stop=function(t){return new c(!0,t)}},function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,e,n){t.exports=n(245)},function(t,e,n){t.exports=n(272)},function(t,e,n){var o=n(14),r=n(51),i=n(42),a=n(25),u=n(52),l=n(15),c=n(89),s=Object.getOwnPropertyDescriptor;e.f=o?s:function(t,e){if(t=a(t),e=u(e,!0),c)try{return s(t,e)}catch(t){}if(l(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){var o=n(12),r=n(28),i="".split;t.exports=o((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==r(t)?i.call(t,""):Object(t)}:Object},function(t,e,n){var o=n(8),r=n(13),i=o.document,a=r(i)&&r(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},function(t,e,n){var o=n(34),r=n(92);(t.exports=function(t,e){return r[t]||(r[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.4",mode:o?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){"use strict";var o=n(5),r=n(152),i=n(94),a=n(98),u=n(29),l=n(18),c=n(46),s=n(9),f=n(34),d=n(38),p=n(93),A=p.IteratorPrototype,h=p.BUGGY_SAFARI_ITERATORS,v=s("iterator"),g=function(){return this};t.exports=function(t,e,n,s,p,m,y){r(n,e,s);var w,x,b,E=function(t){if(t===p&&B)return B;if(!h&&t in C)return C[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},_=e+" Iterator",M=!1,C=t.prototype,S=C[v]||C["@@iterator"]||p&&C[p],B=!h&&S||E(p),k="Array"==e&&C.entries||S;if(k&&(w=i(k.call(new t)),A!==Object.prototype&&w.next&&(f||i(w)===A||(a?a(w,A):"function"!=typeof w[v]&&l(w,v,g)),u(w,_,!0,!0),f&&(d[_]=g))),"values"==p&&S&&"values"!==S.name&&(M=!0,B=function(){return S.call(this)}),f&&!y||C[v]===B||l(C,v,B),d[e]=B,p)if(x={values:E("values"),keys:m?B:E("keys"),entries:E("entries")},y)for(b in x)(h||M||!(b in C))&&c(C,b,x[b]);else o({target:e,proto:!0,forced:h||M},x);return x}},function(t,e,n){var o=n(12);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){return!String(Symbol())}))},function(t,e,n){var o=n(25),r=n(36),i=n(72),a=function(t){return function(e,n,a){var u,l=o(e),c=r(l.length),s=i(a,c);if(t&&n!=n){for(;c>s;)if((u=l[s++])!=u)return!0}else for(;c>s;s++)if((t||s in l)&&l[s]===n)return t||s||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},function(t,e,n){var o=n(55),r=Math.max,i=Math.min;t.exports=function(t,e){var n=o(t);return n<0?r(n+e,0):i(n,e)}},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e,n){var o={};o[n(9)("toStringTag")]="z",t.exports="[object z]"===String(o)},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},function(t,e,n){var o=n(37);t.exports=o("navigator","userAgent")||""},function(t,e,n){"use strict";var o=n(32),r=function(t){var e,n;this.promise=new t((function(t,o){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=o})),this.resolve=o(e),this.reject=o(n)};t.exports.f=function(t){return new r(t)}},function(t,e,n){var o,r,i=n(8),a=n(77),u=i.process,l=u&&u.versions,c=l&&l.v8;c?r=(o=c.split("."))[0]+o[1]:a&&(!(o=a.match(/Edge\/(\d+)/))||o[1]>=74)&&(o=a.match(/Chrome\/(\d+)/))&&(r=o[1]),t.exports=r&&+r},function(t,e,n){var o=n(13),r=n(48),i=n(9)("species");t.exports=function(t,e){var n;return r(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!r(n.prototype)?o(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},function(t,e,n){t.exports=n(186)},function(t,e,n){t.exports=n(190)},function(t,e,n){"use strict";var o=n(52),r=n(16),i=n(42);t.exports=function(t,e,n){var a=o(e);a in t?r.f(t,a,i(0,n)):t[a]=n}},function(t,e,n){var o=n(43),r="["+n(62)+"]",i=RegExp("^"+r+r+"*"),a=RegExp(r+r+"*$"),u=function(t){return function(e){var n=String(o(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(a,"")),n}};t.exports={start:u(1),end:u(2),trim:u(3)}},function(t,e,n){var o=n(9);e.f=o},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=o(n(1)),a=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var u=a(n(27)),l=function(){function t(t,e){var n=this;this.$elem=t,this.editor=e,this._active=!1,t.on("click",(function(t){var o;u.default.hideCurAllPanels(),(0,r.default)(o=e.txt.eventHooks.menuClickEvents).call(o,(function(t){return t()})),t.stopPropagation(),null!=e.selection.getRange()&&n.clickHandler(t)}))}return t.prototype.clickHandler=function(t){},t.prototype.active=function(){this._active=!0,this.$elem.addClass("w-e-active")},t.prototype.unActive=function(){this._active=!1,this.$elem.removeClass("w-e-active")},(0,i.default)(t.prototype,"isActive",{get:function(){return this._active},enumerable:!1,configurable:!0}),t}();e.default=l},function(t,e,n){"use strict";var o=n(0),r=o(n(50)),i=o(n(6)),a=o(n(122)),u=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var l=n(7),c=u(n(320)),s=u(n(321)),f=function(){function t(t){this.editor=t}return t.prototype.alert=function(t,e){var n=this.editor.config.customAlert;n?n(t):window.alert(t),e&&console.error("wangEditor: "+e)},t.prototype.insertImg=function(t){var e=this,n=this.editor,o=n.config,r=function(t,e){return void 0===e&&(e="validate."),n.i18next.t(e+t)};n.cmd.do("insertHTML",'<img src="'+t+'" style="max-width:100%;"/>'),o.linkImgCallback(t);var i=document.createElement("img");i.onload=function(){i=null},i.onerror=function(){e.alert(r("插入图片错误"),"wangEditor: "+r("插入图片错误")+"，"+r("图片链接")+' "'+t+'"，'+r("下载链接失败")),i=null},i.onabort=function(){return i=null},i.src=t},t.prototype.uploadImg=function(t){var e=this;if(t.length){var n=this.editor,o=n.config,u=function(t){return n.i18next.t("validate."+t)},f=o.uploadImgServer,d=o.uploadImgShowBase64,p=o.uploadImgMaxSize,A=p/1024/1024,h=o.uploadImgMaxLength,v=o.uploadFileName,g=o.uploadImgParams,m=o.uploadImgParamsWithUrl,y=o.uploadImgHeaders,w=o.uploadImgHooks,x=o.uploadImgTimeout,b=o.withCredentials,E=o.customUploadImg;if(E||f||d){var _=[],M=[];if(l.arrForEach(t,(function(t){var e=t.name,n=t.size;e&&n&&(!1!==/\.(jpg|jpeg|png|bmp|gif|webp)$/i.test(e)?p<n?M.push("【"+e+"】"+u("大于")+" "+A+"M"):_.push(t):M.push("【"+e+"】"+u("不是图片")))})),M.length)this.alert(u("图片验证未通过")+": \n"+M.join("\n"));else if(_.length>h)this.alert(u("一次最多上传")+h+u("张图片"));else if(E&&"function"==typeof E){var C;E(_,(0,a.default)(C=this.insertImg).call(C,this))}else{var S=new FormData;if((0,i.default)(_).call(_,(function(t,e){var n=v||t.name;_.length>1&&(n+=e+1),S.append(n,t)})),f){var B=f.split("#");f=B[0];var k=B[1]||"";(0,i.default)(l).call(l,g,(function(t,e){m&&((0,r.default)(f).call(f,"?")>0?f+="&":f+="?",f=f+t+"="+e),S.append(t,e)})),k&&(f+="#"+k);var I=c.default(f,{timeout:x,formData:S,headers:y,withCredentials:!!b,beforeSend:function(t){if(w.before)return w.before(t,n,_)},onTimeout:function(t){e.alert(u("上传图片超时")),w.timeout&&w.timeout(t,n)},onProgress:function(t,e){var o=new s.default(n);e.lengthComputable&&(t=e.loaded/e.total,o.show(t))},onError:function(t){e.alert(u("上传图片错误"),u("上传图片错误")+"，"+u("服务器返回状态")+": "+t.status),w.error&&w.error(t,n)},onFail:function(t,o){e.alert(u("上传图片失败"),u("上传图片返回结果错误")+"，"+u("返回结果")+": "+o),w.fail&&w.fail(t,n,o)},onSuccess:function(t,o){if(w.customInsert){var r;w.customInsert((0,a.default)(r=e.insertImg).call(r,e),o,n)}else{if("0"!=o.errno)return e.alert(u("上传图片失败"),u("上传图片返回结果错误")+"，"+u("返回结果")+" errno="+o.errno),void(w.fail&&w.fail(t,n,o));var l=o.data;(0,i.default)(l).call(l,(function(t){e.insertImg(t)})),w.success&&w.success(t,n,o)}}});"string"==typeof I&&this.alert(I)}else d&&l.arrForEach(t,(function(t){var n=e,o=new FileReader;o.readAsDataURL(t),o.onload=function(){this.result&&n.insertImg(this.result.toString())}}))}}}},t}();e.default=f},function(t,e,n){"use strict";var o=n(0)(n(1));(0,o.default)(e,"__esModule",{value:!0});var r=n(378),i=function(){function t(t){this.maxSize=t,this.isRe=!1,this.data=new r.CeilStack(t),this.revokeData=new r.CeilStack(t)}return(0,o.default)(t.prototype,"size",{get:function(){return[this.data.size,this.revokeData.size]},enumerable:!1,configurable:!0}),t.prototype.resetMaxSize=function(t){this.data.resetMax(t),this.revokeData.resetMax(t)},t.prototype.save=function(t){return this.isRe&&(this.revokeData.clear(),this.isRe=!1),this.data.instack(t),this},t.prototype.revoke=function(t){!this.isRe&&(this.isRe=!0);var e=this.data.outstack();return!!e&&(this.revokeData.instack(e),t(e),!0)},t.prototype.restore=function(t){!this.isRe&&(this.isRe=!0);var e=this.revokeData.outstack();return!!e&&(this.data.instack(e),t(e),!0)},t}();e.default=i},function(t,e,n){var o=n(14),r=n(12),i=n(67);t.exports=!o&&!r((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var o=n(12),r=/#|\.prototype\./,i=function(t,e){var n=u[a(t)];return n==c||n!=l&&("function"==typeof e?o(e):!!e)},a=i.normalize=function(t){return String(t).replace(r,".").toLowerCase()},u=i.data={},l=i.NATIVE="N",c=i.POLYFILL="P";t.exports=i},function(t,e,n){var o=n(92),r=Function.toString;"function"!=typeof o.inspectSource&&(o.inspectSource=function(t){return r.call(t)}),t.exports=o.inspectSource},function(t,e,n){var o=n(8),r=n(151),i=o["__core-js_shared__"]||r("__core-js_shared__",{});t.exports=i},function(t,e,n){"use strict";var o,r,i,a=n(94),u=n(18),l=n(15),c=n(9),s=n(34),f=c("iterator"),d=!1;[].keys&&("next"in(i=[].keys())?(r=a(a(i)))!==Object.prototype&&(o=r):d=!0),null==o&&(o={}),s||l(o,f)||u(o,f,(function(){return this})),t.exports={IteratorPrototype:o,BUGGY_SAFARI_ITERATORS:d}},function(t,e,n){var o=n(15),r=n(35),i=n(56),a=n(153),u=i("IE_PROTO"),l=Object.prototype;t.exports=a?Object.getPrototypeOf:function(t){return t=r(t),o(t,u)?t[u]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?l:null}},function(t,e,n){var o=n(70);t.exports=o&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,e,n){var o=n(15),r=n(25),i=n(71).indexOf,a=n(45);t.exports=function(t,e){var n,u=r(t),l=0,c=[];for(n in u)!o(a,n)&&o(u,n)&&c.push(n);for(;e.length>l;)o(u,n=e[l++])&&(~i(c,n)||c.push(n));return c}},function(t,e,n){var o=n(37);t.exports=o("document","documentElement")},function(t,e,n){var o=n(20),r=n(156);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,i){return o(n),r(i),e?t.call(n,i):n.__proto__=i,n}}():void 0)},function(t,e,n){var o=n(8);t.exports=o.Promise},function(t,e,n){var o=n(46);t.exports=function(t,e,n){for(var r in e)n&&n.unsafe&&t[r]?t[r]=e[r]:o(t,r,e[r],n);return t}},function(t,e,n){"use strict";var o=n(37),r=n(16),i=n(9),a=n(14),u=i("species");t.exports=function(t){var e=o(t),n=r.f;a&&e&&!e[u]&&n(e,u,{configurable:!0,get:function(){return this}})}},function(t,e,n){var o=n(20),r=n(32),i=n(9)("species");t.exports=function(t,e){var n,a=o(t).constructor;return void 0===a||null==(n=o(a)[i])?e:r(n)}},function(t,e,n){var o,r,i,a=n(8),u=n(12),l=n(28),c=n(44),s=n(97),f=n(67),d=n(104),p=a.location,A=a.setImmediate,h=a.clearImmediate,v=a.process,g=a.MessageChannel,m=a.Dispatch,y=0,w={},x=function(t){if(w.hasOwnProperty(t)){var e=w[t];delete w[t],e()}},b=function(t){return function(){x(t)}},E=function(t){x(t.data)},_=function(t){a.postMessage(t+"",p.protocol+"//"+p.host)};A&&h||(A=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return w[++y]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},o(y),y},h=function(t){delete w[t]},"process"==l(v)?o=function(t){v.nextTick(b(t))}:m&&m.now?o=function(t){m.now(b(t))}:g&&!d?(i=(r=new g).port2,r.port1.onmessage=E,o=c(i.postMessage,i,1)):!a.addEventListener||"function"!=typeof postMessage||a.importScripts||u(_)||"file:"===p.protocol?o="onreadystatechange"in f("script")?function(t){s.appendChild(f("script")).onreadystatechange=function(){s.removeChild(this),x(t)}}:function(t){setTimeout(b(t),0)}:(o=_,a.addEventListener("message",E,!1))),t.exports={set:A,clear:h}},function(t,e,n){var o=n(77);t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(o)},function(t,e,n){var o=n(20),r=n(13),i=n(78);t.exports=function(t,e){if(o(t),r(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},function(t,e,n){"use strict";var o=n(12);t.exports=function(t,e){var n=[][t];return!!n&&o((function(){n.call(null,e||function(){throw 1},1)}))}},function(t,e,n){t.exports=n(177)},function(t,e,n){t.exports=n(198)},function(t,e,n){"use strict";var o=n(5),r=n(8),i=n(111),a=n(12),u=n(18),l=n(61),c=n(76),s=n(13),f=n(29),d=n(16).f,p=n(39).forEach,A=n(14),h=n(33),v=h.set,g=h.getterFor;t.exports=function(t,e,n){var h,m=-1!==t.indexOf("Map"),y=-1!==t.indexOf("Weak"),w=m?"set":"add",x=r[t],b=x&&x.prototype,E={};if(A&&"function"==typeof x&&(y||b.forEach&&!a((function(){(new x).entries().next()})))){h=e((function(e,n){v(c(e,h,t),{type:t,collection:new x}),null!=n&&l(n,e[w],e,m)}));var _=g(t);p(["add","clear","delete","forEach","get","has","set","keys","values","entries"],(function(t){var e="add"==t||"set"==t;!(t in b)||y&&"clear"==t||u(h.prototype,t,(function(n,o){var r=_(this).collection;if(!e&&y&&!s(n))return"get"==t&&void 0;var i=r[t](0===n?0:n,o);return e?this:i}))})),y||d(h.prototype,"size",{configurable:!0,get:function(){return _(this).collection.size}})}else h=n.getConstructor(e,t,m,w),i.REQUIRED=!0;return f(h,t,!1,!0),E[t]=h,o({global:!0,forced:!0},E),y||n.setStrong(h,t,m),h}},function(t,e,n){var o=n(45),r=n(13),i=n(15),a=n(16).f,u=n(57),l=n(201),c=u("meta"),s=0,f=Object.isExtensible||function(){return!0},d=function(t){a(t,c,{value:{objectID:"O"+ ++s,weakData:{}}})},p=t.exports={REQUIRED:!1,fastKey:function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,c)){if(!f(t))return"F";if(!e)return"E";d(t)}return t[c].objectID},getWeakData:function(t,e){if(!i(t,c)){if(!f(t))return!0;if(!e)return!1;d(t)}return t[c].weakData},onFreeze:function(t){return l&&p.REQUIRED&&f(t)&&!i(t,c)&&d(t),t}};o[c]=!0},function(t,e,n){"use strict";var o=n(16).f,r=n(58),i=n(100),a=n(44),u=n(76),l=n(61),c=n(69),s=n(101),f=n(14),d=n(111).fastKey,p=n(33),A=p.set,h=p.getterFor;t.exports={getConstructor:function(t,e,n,c){var s=t((function(t,o){u(t,s,e),A(t,{type:e,index:r(null),first:void 0,last:void 0,size:0}),f||(t.size=0),null!=o&&l(o,t[c],t,n)})),p=h(e),v=function(t,e,n){var o,r,i=p(t),a=g(t,e);return a?a.value=n:(i.last=a={index:r=d(e,!0),key:e,value:n,previous:o=i.last,next:void 0,removed:!1},i.first||(i.first=a),o&&(o.next=a),f?i.size++:t.size++,"F"!==r&&(i.index[r]=a)),t},g=function(t,e){var n,o=p(t),r=d(e);if("F"!==r)return o.index[r];for(n=o.first;n;n=n.next)if(n.key==e)return n};return i(s.prototype,{clear:function(){for(var t=p(this),e=t.index,n=t.first;n;)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete e[n.index],n=n.next;t.first=t.last=void 0,f?t.size=0:this.size=0},delete:function(t){var e=p(this),n=g(this,t);if(n){var o=n.next,r=n.previous;delete e.index[n.index],n.removed=!0,r&&(r.next=o),o&&(o.previous=r),e.first==n&&(e.first=o),e.last==n&&(e.last=r),f?e.size--:this.size--}return!!n},forEach:function(t){for(var e,n=p(this),o=a(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.next:n.first;)for(o(e.value,e.key,this);e&&e.removed;)e=e.previous},has:function(t){return!!g(this,t)}}),i(s.prototype,n?{get:function(t){var e=g(this,t);return e&&e.value},set:function(t,e){return v(this,0===t?0:t,e)}}:{add:function(t){return v(this,t=0===t?0:t,t)}}),f&&o(s.prototype,"size",{get:function(){return p(this).size}}),s},setStrong:function(t,e,n){var o=e+" Iterator",r=h(e),i=h(o);c(t,e,(function(t,e){A(this,{type:o,target:t,state:r(t),kind:e,last:void 0})}),(function(){for(var t=i(this),e=t.kind,n=t.last;n&&n.removed;)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),s(e)}}},function(t,e,n){t.exports=n(211)},function(t,e,n){var o=n(214),r=n(217);function i(e){return t.exports=i="function"==typeof r&&"symbol"==typeof o?function(t){return typeof t}:function(t){return t&&"function"==typeof r&&t.constructor===r&&t!==r.prototype?"symbol":typeof t},i(e)}t.exports=i},function(t,e,n){n(10)("iterator")},function(t,e,n){var o=n(96),r=n(73).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return o(t,r)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){t.exports=n(243)},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default={zIndex:1e4}},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0}),e.getPasteImgs=e.getPasteHtml=e.getPasteText=void 0;var a=n(7),u=i(n(281));function l(t){var e=t.clipboardData,n="";return n=null==e?window.clipboardData&&window.clipboardData.getData("text"):e.getData("text/plain"),a.replaceHtmlSymbol(n)}e.getPasteText=l,e.getPasteHtml=function(t,e,n){void 0===e&&(e=!0),void 0===n&&(n=!1);var o=t.clipboardData,r="";if(o&&(r=o.getData("text/html")),!r){var i=l(t);if(!i)return"";r="<p>"+i+"</p>"}return r=u.default(r,e,n)},e.getPasteImgs=function(t){var e=[];if(l(t))return e;var n=t.clipboardData.items;return n?((0,r.default)(a).call(a,n,(function(t,n){var o=n.type;/image/i.test(o)&&e.push(n.getAsFile())})),e):e}},function(t,e,n){t.exports=n(283)},function(t,e,n){t.exports=n(290)},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=o(n(1)),a=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var u=a(n(2)),l=n(30),c=function(){function t(t,e){var n=this;this.hideTimeoutId=0,this.showTimeoutId=0,this.menu=t,this.conf=e;var o=u.default('<div class="w-e-droplist"></div>'),i=u.default("<p>"+e.title+"</p>");i.addClass("w-e-dp-title"),o.append(i);var a=e.list||[],c=e.type||"list",s=e.clickHandler||l.EMPTY_FN,f=u.default('<ul class="'+("list"===c?"w-e-list":"w-e-block")+'"></ul>');(0,r.default)(a).call(a,(function(t){var e=t.$elem,o=t.value,r=u.default('<li class="w-e-item"></li>');e&&(r.append(e),f.append(r),r.on("click",(function(){s(o),n.hideTimeoutId=window.setTimeout((function(){n.hide()}))})))})),o.append(f),o.on("mouseleave",(function(){n.hideTimeoutId=window.setTimeout((function(){n.hide()}))})),this.$container=o,this.rendered=!1,this._show=!1}return t.prototype.show=function(){this.hideTimeoutId&&clearTimeout(this.hideTimeoutId);var t=this.menu.$elem,e=this.$container;if(!this._show){if(this.rendered)e.show();else{var n=t.getSizeData().height||0,o=this.conf.width||100;e.css("margin-top",n+"px").css("width",o+"px"),t.append(e),this.rendered=!0}this._show=!0}},t.prototype.hide=function(){this.showTimeoutId&&clearTimeout(this.showTimeoutId);var t=this.$container;this._show&&(t.hide(),this._show=!1)},(0,i.default)(t.prototype,"isShow",{get:function(){return this._show},enumerable:!1,configurable:!0}),t}();e.default=c},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t){var e=t.selection.getSelectionContainerElem();return!!e&&"A"===e.getNodeName()}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t){var e=t.selection.getSelectionContainerElem();return!!e&&!("CODE"!=e.getNodeName()&&"PRE"!=e.getNodeName()&&"CODE"!=e.parent().getNodeName()&&"PRE"!=e.parent().getNodeName()&&!/hljs/.test(e.parent().attr("class")))}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),n(131),n(133),n(137),n(139),n(141),n(143),n(145);var r=o(n(168));try{document}catch(t){throw new Error("请在浏览器环境下运行")}e.default=r.default},function(t,e,n){var o=n(128);t.exports=o},function(t,e,n){n(129);var o=n(11).Object,r=t.exports=function(t,e,n){return o.defineProperty(t,e,n)};o.defineProperty.sham&&(r.sham=!0)},function(t,e,n){var o=n(5),r=n(14);o({target:"Object",stat:!0,forced:!r,sham:!r},{defineProperty:n(16).f})},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var o=n(21),r=n(132);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,'.w-e-toolbar,\n.w-e-text-container,\n.w-e-menu-panel {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: #fff;\n  /*表情菜单样式*/\n  /*分割线样式*/\n}\n.w-e-toolbar .eleImg,\n.w-e-text-container .eleImg,\n.w-e-menu-panel .eleImg {\n  cursor: pointer;\n  display: inline-block;\n  font-size: 18px;\n  padding: 0 3px;\n}\n.w-e-toolbar *,\n.w-e-text-container *,\n.w-e-menu-panel * {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n.w-e-toolbar hr,\n.w-e-text-container hr,\n.w-e-menu-panel hr {\n  cursor: pointer;\n  display: block;\n  height: 0px;\n  border: 0;\n  border-top: 3px solid #ccc;\n  margin: 20px 0;\n}\n.w-e-clear-fix:after {\n  content: "";\n  display: table;\n  clear: both;\n}\n.w-e-drop-list-item {\n  position: relative;\n  top: 1px;\n  padding-right: 7px;\n  color: #333 !important;\n}\n.w-e-drop-list-tl {\n  padding-left: 10px;\n  text-align: left;\n}\n',""]),t.exports=e},function(t,e,n){var o=n(21),r=n(134);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){var o=n(22),r=n(135),i=n(136);e=o(!1);var a=r(i);e.push([t.i,"@font-face {\n  font-family: 'w-e-icon';\n  src: url("+a+') format(\'truetype\');\n  font-weight: normal;\n  font-style: normal;\n}\n[class^="w-e-icon-"],\n[class*=" w-e-icon-"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: \'w-e-icon\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.w-e-icon-close:before {\n  content: "\\f00d";\n}\n.w-e-icon-upload2:before {\n  content: "\\e9c6";\n}\n.w-e-icon-trash-o:before {\n  content: "\\f014";\n}\n.w-e-icon-header:before {\n  content: "\\f1dc";\n}\n.w-e-icon-pencil2:before {\n  content: "\\e906";\n}\n.w-e-icon-paint-brush:before {\n  content: "\\f1fc";\n}\n.w-e-icon-image:before {\n  content: "\\e90d";\n}\n.w-e-icon-play:before {\n  content: "\\e912";\n}\n.w-e-icon-location:before {\n  content: "\\e947";\n}\n.w-e-icon-undo:before {\n  content: "\\e965";\n}\n.w-e-icon-redo:before {\n  content: "\\e966";\n}\n.w-e-icon-quotes-left:before {\n  content: "\\e977";\n}\n.w-e-icon-list-numbered:before {\n  content: "\\e9b9";\n}\n.w-e-icon-list2:before {\n  content: "\\e9bb";\n}\n.w-e-icon-link:before {\n  content: "\\e9cb";\n}\n.w-e-icon-happy:before {\n  content: "\\e9df";\n}\n.w-e-icon-bold:before {\n  content: "\\ea62";\n}\n.w-e-icon-underline:before {\n  content: "\\ea63";\n}\n.w-e-icon-italic:before {\n  content: "\\ea64";\n}\n.w-e-icon-strikethrough:before {\n  content: "\\ea65";\n}\n.w-e-icon-table2:before {\n  content: "\\ea71";\n}\n.w-e-icon-paragraph-left:before {\n  content: "\\ea77";\n}\n.w-e-icon-paragraph-center:before {\n  content: "\\ea78";\n}\n.w-e-icon-paragraph-right:before {\n  content: "\\ea79";\n}\n.w-e-icon-terminal:before {\n  content: "\\f120";\n}\n.w-e-icon-page-break:before {\n  content: "\\ea68";\n}\n.w-e-icon-cancel-circle:before {\n  content: "\\ea0d";\n}\n.w-e-icon-font:before {\n  content: "\\ea5c";\n}\n.w-e-icon-text-heigh:before {\n  content: "\\ea5f";\n}\n.w-e-icon-paint-format:before {\n  content: "\\e90c";\n}\n.w-e-icon-indent-increase:before {\n  content: "\\ea7b";\n}\n.w-e-icon-indent-decrease:before {\n  content: "\\ea7c";\n}\n.w-e-icon-row-height:before {\n  content: "\\e9be";\n}\n.w-e-icon-fullscreen_exit:before {\n  content: "\\e900";\n}\n.w-e-icon-fullscreen:before {\n  content: "\\e901";\n}\n.w-e-icon-split-line:before {\n  content: "\\ea0b";\n}\n.w-e-icon-checkbox-checked:before {\n  content: "\\ea52";\n}\n',""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t,e){return e||(e={}),"string"!=typeof(t=t&&t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},function(t,e,n){"use strict";n.r(e),e.default="data:font/woff;base64,d09GRgABAAAAABrcAAsAAAAAGpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIPFWNtYXAAAAFoAAABJAAAAST/4dF7Z2FzcAAAAowAAAAIAAAACAAAABBnbHlmAAAClAAAFTAAABUwrNIRu2hlYWQAABfEAAAANgAAADYbkuK6aGhlYQAAF/wAAAAkAAAAJAkjBWhobXR4AAAYIAAAAKAAAACglYcEbmxvY2EAABjAAAAAUgAAAFJegllAbWF4cAAAGRQAAAAgAAAAIAAzALZuYW1lAAAZNAAAAYYAAAGGmUoJ+3Bvc3QAABq8AAAAIAAAACAAAwAAAAMD7wGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA8fwDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAQgAAAA+ACAABAAeAAEAIOkB6QbpDekS6UfpZul36bnpu+m+6cbpy+nf6gvqDepS6lzqX+pl6nHqeep88A3wFPEg8dzx/P/9//8AAAAAACDpAOkG6QzpEulH6WXpd+m56bvpvunG6cvp3+oL6g3qUupc6l/qYupx6nfqe/AN8BTxIPHc8fz//f//AAH/4xcEFwAW+xb3FsMWphaWFlUWVBZSFksWRxY0FgkWCBXEFbsVuRW3FawVpxWmEBYQEA8FDkoOKwADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAQAQQABA78DfwAFAAsAEQAXAAABMxUhETMDESEVIxUBNTMRITURNSERIzUC/8D+wn5+AT7A/gJ+/sIBPn4Cv34BPvyCAT5+wAK+wP7Cfv4Cfv7CwAAAAAAEAEEAAQO/A38ABQALABEAFwAAASERIzUjEzUzESE1AREhFSMVERUzFSERAoEBPn7AwH7+wv3AAT7AwP7CA3/+wsD9fsD+wn4BwgE+fsD+/sB+AT4AAAAAAgAA/8AEAAPAAAQAEwAAATcBJwEDLgEnEzcBIwEDJQE1AQcBgIABwED+QJ8XOzJjgAGAwP6AwAKAAYD+gE4BQEABwED+QP6dMjsXARFOAYD+gP2AwAGAwP6AgAACAAD/wAQAA4AAKQAtAAABESM1NCYjISIGHQEUFjMhMjY9ATMRIRUjIgYVERQWOwEyNjURNCYrATUBITUhBADAJhr9QBomJhoCwBomgP3AIA0TEw2ADRMTDSABQP1AAsABgAGAQBomJhrAGiYmGkD/AIATDf7ADRMTDQFADRNAAYBAAAAEAAAAAAQAA4AAEAAhAC0ANAAAATgBMRE4ATEhOAExETgBMSE1ISIGFREUFjMhMjY1ETQmIwcUBiMiJjU0NjMyFhMhNRMBMzcDwPyAA4D8gBomJhoDgBomJhqAOCgoODgoKDhA/QDgAQBA4ANA/QADAEAmGv0AGiYmGgMAGibgKDg4KCg4OP24gAGA/sDAAAACAAAAQAQAA0AAOAA8AAABJicuAScmIyIHDgEHBgcGBw4BBwYVFBceARcWFxYXHgEXFjMyNz4BNzY3Njc+ATc2NTQnLgEnJicBEQ0BA9U2ODl2PD0/Pz08djk4NgsHCAsDAwMDCwgHCzY4OXY8PT8/PTx2OTg2CwcICwMDAwMLCAcL/asBQP7AAyAIBgYIAgICAggGBggpKipZLS4vLy4tWSoqKQgGBggCAgICCAYGCCkqKlktLi8vLi1ZKiop/eABgMDAAAAAAAIAwP/AA0ADwAAbACcAAAEiBw4BBwYVFBceARcWMTA3PgE3NjU0Jy4BJyYDIiY1NDYzMhYVFAYCAEI7OlcZGTIyeDIyMjJ4MjIZGVc6O0JQcHBQUHBwA8AZGVc6O0J4fX3MQUFBQcx9fXhCOzpXGRn+AHBQUHBwUFBwAAABAAAAAAQAA4AAKwAAASIHDgEHBgcnESEnPgEzMhceARcWFRQHDgEHBgcXNjc+ATc2NTQnLgEnJiMCADUyMlwpKSOWAYCQNYtQUEVGaR4eCQkiGBgeVSggIC0MDCgoi15dagOACgsnGxwjlv6AkDQ8Hh5pRkVQKygpSSAhGmAjKytiNjY5al1eiygoAAEAAAAABAADgAAqAAATFBceARcWFzcmJy4BJyY1NDc+ATc2MzIWFwchEQcmJy4BJyYjIgcOAQcGAAwMLSAgKFUeGBgiCQkeHmlGRVBQizWQAYCWIykpXDIyNWpdXosoKAGAOTY2YisrI2AaISBJKSgrUEVGaR4ePDSQAYCWIxwbJwsKKCiLXl0AAAAAAgAAAEAEAQMAACYATQAAEzIXHgEXFhUUBw4BBwYjIicuAScmNSc0Nz4BNzYzFSIGBw4BBz4BITIXHgEXFhUUBw4BBwYjIicuAScmNSc0Nz4BNzYzFSIGBw4BBz4B4S4pKT0REhIRPSkpLi4pKT0REgEjI3pSUV1AdS0JEAcIEgJJLikpPRESEhE9KSkuLikpPRESASMjelJRXUB1LQkQBwgSAgASET0pKS4uKSk9ERISET0pKS4gXVFSeiMjgDAuCBMKAgESET0pKS4uKSk9ERISET0pKS4gXVFSeiMjgDAuCBMKAgEAAAYAQP/ABAADwAADAAcACwARAB0AKQAAJSEVIREhFSERIRUhJxEjNSM1ExUzFSM1NzUjNTMVFREjNTM1IzUzNSM1AYACgP2AAoD9gAKA/YDAQEBAgMCAgMDAgICAgICAAgCAAgCAwP8AwED98jJAkjwyQJLu/sBAQEBAQAAGAAD/wAQAA8AAAwAHAAsAFwAjAC8AAAEhFSERIRUhESEVIQE0NjMyFhUUBiMiJhE0NjMyFhUUBiMiJhE0NjMyFhUUBiMiJgGAAoD9gAKA/YACgP2A/oBLNTVLSzU1S0s1NUtLNTVLSzU1S0s1NUsDgID/AID/AIADQDVLSzU1S0v+tTVLSzU1S0v+tTVLSzU1S0sABQAAAEAFYAMAAAMABwALAA4AEQAAEyEVIRUhFSEVIRUhARc3NScHAAOA/IADgPyAA4D8gAPgwMDAwAMAwEDAQMABQMDAQMDAAAAAAAMAAAAABAADoAADAA0AFAAANyEVISUVITUTIRUhNSElCQEjESMRAAQA/AAEAPwAgAEAAQABAP1gASABIOCAQEDAQEABAICAwAEg/uD/AAEAAAAAAAIAHv/MA+IDtAAzAGQAAAEiJicmJyY0NzY/AT4BMzIWFxYXFhQHBg8BBiInJjQ/ATY0Jy4BIyIGDwEGFBcWFAcOASMDIiYnJicmNDc2PwE2MhcWFA8BBhQXHgEzMjY/ATY0JyY0NzYyFxYXFhQHBg8BDgEjAbgKEwgjEhISEiPAI1kxMVkjIxISEhIjWA8sDw8PWCkpFDMcHDMUwCkpDw8IEwq4MVkjIxISEhIjWA8sDw8PWCkpFDMcHDMUwCkpDw8PKxAjEhISEiPAI1kxAUQIByQtLV4tLSTAIiUlIiQtLV4tLSRXEBAPKw9YKXQpFBUVFMApdCkPKxAHCP6IJSIkLS1eLS0kVxAQDysPWCl0KRQVFRTAKXQpDysQDw8kLS1eLS0kwCIlAAAAAAUAAP/ABAADwAAbADcAUwBfAGsAAAUyNz4BNzY1NCcuAScmIyIHDgEHBhUUFx4BFxYTMhceARcWFRQHDgEHBiMiJy4BJyY1NDc+ATc2EzI3PgE3NjcGBw4BBwYjIicuAScmJxYXHgEXFic0NjMyFhUUBiMiJiU0NjMyFhUUBiMiJgIAal1eiygoKCiLXl1qal1eiygoKCiLXl1qVkxMcSAhISBxTExWVkxMcSAhISBxTExWKysqUSYmIwUcG1Y4Nz8/NzhWGxwFIyYmUSor1SUbGyUlGxslAYAlGxslJRsbJUAoKIteXWpqXV6LKCgoKIteXWpqXV6LKCgDoCEgcUxMVlZMTHEgISEgcUxMVlZMTHEgIf4JBgYVEBAUQzo6VhgZGRhWOjpDFBAQFQYG9yg4OCgoODgoKDg4KCg4OAAAAQAAAUAEAAJAAA8AABMVFBYzITI2PQE0JiMhIgYAEw0DwA0TEw38QA0TAiDADRMTDcANExMAAAADAAD/wAQAA8AAGwA3AEMAAAEiBw4BBwYVFBceARcWMzI3PgE3NjU0Jy4BJyYDIicuAScmNTQ3PgE3NjMyFx4BFxYVFAcOAQcGEwcnBxcHFzcXNyc3AgBqXV6LKCgoKIteXWpqXV6LKCgoKIteXWpWTExxICEhIHFMTFZWTExxICEhIHFMTEqgoGCgoGCgoGCgoAPAKCiLXl1qal1eiygoKCiLXl1qal1eiygo/GAhIHFMTFZWTExxICEhIHFMTFZWTExxICECoKCgYKCgYKCgYKCgAAIAAP/ABAADwAAPABUAAAEhIgYVERQWMyEyNjURNCYBJzcXARcDgP0ANUtLNQMANUtL/gvtWpMBM1oDwEs1/QA1S0s1AwA1S/zl7lqSATJaAAAAAAEAZf/AA5sDwAApAAABIiYjIgcOAQcGFRQWMy4BNTQ2NzAHBgIHBgcVIRMzNyM3HgEzMjY3DgEDIERoRnFTVG0aG0lIBg1lShAQSzw8WQE9bMYs1zQtVSYuUBgdPQOwEB4dYT4/QU07CyY3mW8DfX7+xY+QIxkCAID2CQ83awkHAAAAAAIAAAAABAADgAAJABcAACUzByczESM3FyMlEScjETMVITUzESMHEQOAgKCggICgoID/AEDAgP6AgMBAwMDAAgDAwMD/AID9QEBAAsCAAQAAAwDAAAADQAOAABYAHwAoAAABPgE1NCcuAScmIyERITI3PgE3NjU0JgEzMhYVFAYrARMjETMyFhUUBgLEHCAUFEYuLzX+wAGANS8uRhQURP6EZSo8PClmn5+fLD4+AdsiVC81Ly5GFBT8gBQURi4vNUZ0AUZLNTVL/oABAEs1NUsAAAAAAgDAAAADQAOAAB8AIwAAATMRFAcOAQcGIyInLgEnJjURMxEUFhceATMyNjc+ATUBIRUhAsCAGRlXOjtCQjs6VxkZgBsYHEkoKEkcGBv+AAKA/YADgP5gPDQ1ThYXFxZONTQ8AaD+YB44FxgbGxgXOB7+oIAAAAAAAQCAAAADgAOAAAsAAAEVIwEzFSE1MwEjNQOAgP7AgP5AgAFAgAOAQP0AQEADAEAAAQAAAAAEAAOAAD0AAAEVIx4BFRQGBw4BIyImJy4BNTMUFjMyNjU0JiMhNSEuAScuATU0Njc+ATMyFhceARUjNCYjIgYVFBYzMhYXBADrFRY1MCxxPj5xLDA1gHJOTnJyTv4AASwCBAEwNTUwLHE+PnEsMDWAck5OcnJOO24rAcBAHUEiNWIkISQkISRiNTRMTDQ0TEABAwEkYjU1YiQhJCQhJGI1NExMNDRMIR8AAAAKAAAAAAQAA4AAAwAHAAsADwATABcAGwAfACMAJwAAExEhEQE1IRUdASE1ARUhNSMVITURIRUhJSEVIRE1IRUBIRUhITUhFQAEAP2AAQD/AAEA/wBA/wABAP8AAoABAP8AAQD8gAEA/wACgAEAA4D8gAOA/cDAwEDAwAIAwMDAwP8AwMDAAQDAwP7AwMDAAAAFAAAAAAQAA4AAAwAHAAsADwATAAATIRUhFSEVIREhFSERIRUhESEVIQAEAPwAAoD9gAKA/YAEAPwABAD8AAOAgECA/wCAAUCA/wCAAAAAAAUAAAAABAADgAADAAcACwAPABMAABMhFSEXIRUhESEVIQMhFSERIRUhAAQA/ADAAoD9gAKA/YDABAD8AAQA/AADgIBAgP8AgAFAgP8AgAAABQAAAAAEAAOAAAMABwALAA8AEwAAEyEVIQUhFSERIRUhASEVIREhFSEABAD8AAGAAoD9gAKA/YD+gAQA/AAEAPwAA4CAQID/AIABQID/AIAAAAAABgAAAAAEAAOAAAMABwALAA8AEwAWAAATIRUhBSEVIRUhFSEVIRUhBSEVIRkBBQAEAPwAAYACgP2AAoD9gAKA/YD+gAQA/AABAAOAgECAQIBAgECAAQABgMAAAAAGAAAAAAQAA4AAAwAHAAsADwATABYAABMhFSEFIRUhFSEVIRUhFSEFIRUhARElAAQA/AABgAKA/YACgP2AAoD9gP6ABAD8AAEA/wADgIBAgECAQIBAgAKA/oDAAAEAPwA/AuYC5gAsAAAlFA8BBiMiLwEHBiMiLwEmNTQ/AScmNTQ/ATYzMh8BNzYzMh8BFhUUDwEXFhUC5hBOEBcXEKioEBcWEE4QEKioEBBOEBYXEKioEBcXEE4QEKioEMMWEE4QEKioEBBOEBYXEKioEBcXEE4QEKioEBBOEBcXEKioEBcAAAAGAAAAAAMlA24AFAAoADwATQBVAIIAAAERFAcGKwEiJyY1ETQ3NjsBMhcWFTMRFAcGKwEiJyY1ETQ3NjsBMhcWFxEUBwYrASInJjURNDc2OwEyFxYTESERFBcWFxYzITI3Njc2NQEhJyYnIwYHBRUUBwYrAREUBwYjISInJjURIyInJj0BNDc2OwE3Njc2OwEyFxYfATMyFxYVASUGBQgkCAUGBgUIJAgFBpIFBQglCAUFBQUIJQgFBZIFBQglCAUFBQUIJQgFBUn+AAQEBQQCAdsCBAQEBP6AAQAbBAa1BgQB9wYFCDcaGyb+JSYbGzcIBQUFBQixKAgXFhe3FxYWCSiwCAUGAhL+twgFBQUFCAFJCAUGBgUI/rcIBQUFBQgBSQgFBgYFCP63CAUFBQUIAUkIBQYGBf5bAh394w0LCgUFBQUKCw0CZkMFAgIFVSQIBgX94zAiIyEiLwIgBQYIJAgFBWAVDw8PDxVgBQUIAAIABwBJA7cCrwAaAC4AAAkBBiMiLwEmNTQ/AScmNTQ/ATYzMhcBFhUUBwEVFAcGIyEiJyY9ATQ3NjMhMhcWAU7+9gYHCAUdBgbh4QYGHQUIBwYBCgYGAmkFBQj92wgFBQUFCAIlCAUFAYX+9gYGHAYIBwbg4QYHBwYdBQX+9QUIBwb++yUIBQUFBQglCAUFBQUAAAABACMAAAPdA24AswAAJSInJiMiBwYjIicmNTQ3Njc2NzY3Nj0BNCcmIyEiBwYdARQXFhcWMxYXFhUUBwYjIicmIyIHBiMiJyY1NDc2NzY3Njc2PQERNDU0NTQnNCcmJyYnJicmJyYjIicmNTQ3NjMyFxYzMjc2MzIXFhUUBwYjBgcGBwYdARQXFjMhMjc2PQE0JyYnJicmNTQ3NjMyFxYzMjc2MzIXFhUUBwYHIgcGBwYVERQXFhcWFzIXFhUUBwYjA8EZMzIaGTIzGQ0IBwkKDQwREAoSAQcV/n4WBwEVCRITDg4MCwcHDhs1NRoYMTEYDQcHCQkLDBAPCRIBAgECAwQEBQgSEQ0NCgsHBw4aNTUaGDAxGA4HBwkKDA0QEAgUAQcPAZAOBwEUChcXDw4HBw4ZMzIZGTExGQ4HBwoKDQ0QEQgUFAkREQ4NCgsHBw4AAgICAgwLDxEJCQEBAwMFDETgDAUDAwUM1FENBgECAQgIEg8MDQICAgIMDA4RCAkBAgMDBQ1FIQHQAg0NCAgODgoKCwsHBwMGAQEICBIPDA0CAgICDQwPEQgIAQIBBgxQtgwHAQEHDLZQDAYBAQYHFg8MDQICAgINDA8RCAgBAQIGDU/95kQMBgICAQkIEQ8MDQAAAgAA/7cD/wO3ABMAOQAAATIXFhUUBwIHBiMiJyY1NDcBNjMBFhcWHwEWBwYjIicmJyYnJjUWFxYXFhcWMzI3Njc2NzY3Njc2NwObKB4eGr5MN0VINDQ1AW0hKf34FyYnLwECTEx7RzY2ISEQEQQTFBAQEhEJFwgPEhMVFR0dHh4pA7cbGigkM/6ZRjQ1NElJMAFLH/2xKx8fDSh6TUwaGy4vOjpEAw8OCwsKChYlGxoREQoLBAQCAAEAAAAAAABiKug1Xw889QALBAAAAAAA24pPIwAAAADbik8jAAD/twVgA8AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABYAAAP//BWAAAQAAAAAAAAAAAAAAAAAAACgEAAAAAAAAAAAAAAACAAAABAAAQQQAAEEEAAAABAAAAAQAAAAEAAAABAAAwAQAAAAEAAAABAAAAAQAAEAEAAAABYAAAAQAAAAEAAAeBAAAAAQAAAAEAAAABAAAAAQAAGUEAAAABAAAwAQAAMAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAMlAD8DJQAAA74ABwQAACMD/wAAAAAAAAAKABQAHgBKAHYApADmAS4BkgHQAhYCXALQAw4DWAN+A6gEPgTeBPoFZAWOBdAF+AY6BnYGjgbmBy4HVgd+B6gH1ggECEgJAAlKCjwKmAAAAAEAAAAoALQACgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},function(t,e,n){var o=n(21),r=n(138);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,".w-e-toolbar {\n  display: flex;\n  padding: 0 6px;\n  flex-wrap: wrap;\n  /* 单个菜单 */\n}\n.w-e-toolbar .w-e-menu {\n  position: relative;\n  display: flex;\n  width: 40px;\n  height: 40px;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  cursor: pointer;\n}\n.w-e-toolbar .w-e-menu i {\n  color: #999;\n}\n.w-e-toolbar .w-e-menu:hover {\n  background-color: #F6F6F6;\n}\n.w-e-toolbar .w-e-menu:hover i {\n  color: #333;\n}\n.w-e-toolbar .w-e-active i {\n  color: #1e88e5;\n}\n.w-e-toolbar .w-e-active:hover i {\n  color: #1e88e5;\n}\n",""]),t.exports=e},function(t,e,n){var o=n(21),r=n(140);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,'.w-e-text-container {\n  position: relative;\n}\n.w-e-text-container .w-e-progress {\n  position: absolute;\n  background-color: #1e88e5;\n  top: 0;\n  left: 0;\n  height: 1px;\n}\n.w-e-text-container .placeholder {\n  color: #D4D4D4;\n  position: absolute;\n  font-size: 11pt;\n  line-height: 22px;\n  left: 10px;\n  top: 10px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: -1;\n}\n.w-e-text {\n  padding: 0 10px;\n  overflow-y: auto;\n}\n.w-e-text p,\n.w-e-text h1,\n.w-e-text h2,\n.w-e-text h3,\n.w-e-text h4,\n.w-e-text h5,\n.w-e-text table,\n.w-e-text pre {\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.w-e-text ul,\n.w-e-text ol {\n  margin: 10px 0 10px 20px;\n}\n.w-e-text blockquote {\n  display: block;\n  border-left: 8px solid #d0e5f2;\n  padding: 5px 10px;\n  margin: 10px 0;\n  line-height: 1.4;\n  font-size: 100%;\n  background-color: #f1f1f1;\n}\n.w-e-text code {\n  display: inline-block;\n  background-color: #f1f1f1;\n  border-radius: 3px;\n  padding: 3px 5px;\n  margin: 0 3px;\n}\n.w-e-text pre code {\n  display: block;\n}\n.w-e-text table {\n  border-top: 1px solid #ccc;\n  border-left: 1px solid #ccc;\n}\n.w-e-text table td,\n.w-e-text table th {\n  border-bottom: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n  padding: 3px 5px;\n  min-height: 30px;\n}\n.w-e-text table th {\n  border-bottom: 2px solid #ccc;\n  text-align: center;\n  background-color: #f1f1f1;\n}\n.w-e-text:focus {\n  outline: none;\n}\n.w-e-text img {\n  cursor: pointer;\n}\n.w-e-text img:hover {\n  box-shadow: 0 0 5px #333;\n}\n.w-e-tooltip {\n  display: flex;\n  color: #f1f1f1;\n  background-color: rgba(0, 0, 0, 0.75);\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  padding: 4px 5px 6px;\n  position: absolute;\n}\n.w-e-tooltip-up::after {\n  content: "";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border: 5px solid rgba(0, 0, 0, 0);\n  border-top-color: rgba(0, 0, 0, 0.73);\n}\n.w-e-tooltip-down::after {\n  content: "";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border: 5px solid rgba(0, 0, 0, 0);\n  border-bottom-color: rgba(0, 0, 0, 0.73);\n}\n.w-e-tooltip-item-wrapper {\n  cursor: pointer;\n  font-size: 14px;\n  margin: 0 5px;\n}\n.w-e-tooltip-item-wrapper:hover {\n  color: #ccc;\n  text-decoration: underline;\n}\n',""]),t.exports=e},function(t,e,n){var o=n(21),r=n(142);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,'.w-e-menu .w-e-panel-container {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  border: 1px solid #ccc;\n  border-top: 0;\n  box-shadow: 1px 1px 2px #ccc;\n  color: #333;\n  background-color: #fff;\n  text-align: left;\n  /* 为 emotion panel 定制的样式 */\n  /* 上传图片的 panel 定制样式 */\n}\n.w-e-menu .w-e-panel-container .w-e-panel-close {\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 5px;\n  margin: 2px 5px 0 0;\n  cursor: pointer;\n  color: #999;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-close:hover {\n  color: #333;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-title {\n  list-style: none;\n  display: flex;\n  font-size: 14px;\n  margin: 2px 10px 0 10px;\n  border-bottom: 1px solid #f1f1f1;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-title .w-e-item {\n  padding: 3px 5px;\n  color: #999;\n  cursor: pointer;\n  margin: 0 3px;\n  position: relative;\n  top: 1px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-title .w-e-active {\n  color: #333;\n  border-bottom: 1px solid #333;\n  cursor: default;\n  font-weight: 700;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content {\n  padding: 10px 15px 10px 15px;\n  font-size: 16px;\n  /* 输入框的样式 */\n  /* 按钮的样式 */\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input:focus,\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content textarea:focus,\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content button:focus {\n  outline: none;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content textarea {\n  width: 100%;\n  border: 1px solid #ccc;\n  padding: 5px;\n  margin-top: 10px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content textarea:focus {\n  border-color: #1e88e5;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text] {\n  border: none;\n  border-bottom: 1px solid #ccc;\n  font-size: 14px;\n  height: 20px;\n  color: #333;\n  text-align: left;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text].small {\n  width: 30px;\n  text-align: center;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text].block {\n  display: block;\n  width: 100%;\n  margin: 10px 0;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text]:focus {\n  border-bottom: 2px solid #1e88e5;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button {\n  font-size: 14px;\n  color: #1e88e5;\n  border: none;\n  padding: 5px 10px;\n  background-color: #fff;\n  cursor: pointer;\n  border-radius: 3px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.left {\n  float: left;\n  margin-right: 10px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.right {\n  float: right;\n  margin-left: 10px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.gray {\n  color: #999;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.red {\n  color: #c24f4a;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button:hover {\n  background-color: #f1f1f1;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container:after {\n  content: "";\n  display: table;\n  clear: both;\n}\n.w-e-menu .w-e-panel-container .w-e-emoticon-container .w-e-item {\n  cursor: pointer;\n  font-size: 18px;\n  padding: 0 3px;\n  display: inline-block;\n}\n.w-e-menu .w-e-panel-container .w-e-up-img-container {\n  text-align: center;\n}\n.w-e-menu .w-e-panel-container .w-e-up-img-container .w-e-up-btn {\n  display: inline-block;\n  color: #999;\n  cursor: pointer;\n  font-size: 60px;\n  line-height: 1;\n}\n.w-e-menu .w-e-panel-container .w-e-up-img-container .w-e-up-btn:hover {\n  color: #333;\n}\n',""]),t.exports=e},function(t,e,n){var o=n(21),r=n(144);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,".w-e-toolbar .w-e-droplist {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-color: #fff;\n  border: 1px solid #f1f1f1;\n  border-right-color: #ccc;\n  border-bottom-color: #ccc;\n}\n.w-e-toolbar .w-e-droplist .w-e-dp-title {\n  text-align: center;\n  color: #999;\n  line-height: 2;\n  border-bottom: 1px solid #f1f1f1;\n  font-size: 13px;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-list {\n  list-style: none;\n  line-height: 1;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item {\n  color: #333;\n  padding: 5px 0;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item:hover {\n  background-color: #f1f1f1;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-block {\n  list-style: none;\n  text-align: left;\n  padding: 5px;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {\n  display: inline-block;\n  padding: 3px 5px;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {\n  background-color: #f1f1f1;\n}\n",""]),t.exports=e},function(t,e,n){"use strict";var o=n(0)(n(146));Element.prototype.matches||(Element.prototype.matches=function(t){for(var e=this.ownerDocument.querySelectorAll(t),n=e.length;n>=0&&e.item(n)!==this;n--);return n>-1}),window.Promise=o.default},function(t,e,n){t.exports=n(147)},function(t,e,n){var o=n(148);t.exports=o},function(t,e,n){n(53),n(54),n(47),n(159),n(166),n(167);var o=n(11);t.exports=o.Promise},function(t,e,n){var o=n(55),r=n(43),i=function(t){return function(e,n){var i,a,u=String(r(e)),l=o(n),c=u.length;return l<0||l>=c?t?"":void 0:(i=u.charCodeAt(l))<55296||i>56319||l+1===c||(a=u.charCodeAt(l+1))<56320||a>57343?t?u.charAt(l):i:t?u.slice(l,l+2):a-56320+(i-55296<<10)+65536}};t.exports={codeAt:i(!1),charAt:i(!0)}},function(t,e,n){var o=n(8),r=n(91),i=o.WeakMap;t.exports="function"==typeof i&&/native code/.test(r(i))},function(t,e,n){var o=n(8),r=n(18);t.exports=function(t,e){try{r(o,t,e)}catch(n){o[t]=e}return e}},function(t,e,n){"use strict";var o=n(93).IteratorPrototype,r=n(58),i=n(42),a=n(29),u=n(38),l=function(){return this};t.exports=function(t,e,n){var c=e+" Iterator";return t.prototype=r(o,{next:i(1,n)}),a(t,c,!1,!0),u[c]=l,t}},function(t,e,n){var o=n(12);t.exports=!o((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},function(t,e,n){var o=n(14),r=n(16),i=n(20),a=n(59);t.exports=o?Object.defineProperties:function(t,e){i(t);for(var n,o=a(e),u=o.length,l=0;u>l;)r.f(t,n=o[l++],e[n]);return t}},function(t,e,n){"use strict";var o=n(74),r=n(60);t.exports=o?{}.toString:function(){return"[object "+r(this)+"]"}},function(t,e,n){var o=n(13);t.exports=function(t){if(!o(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,e,n){"use strict";var o=n(25),r=n(75),i=n(38),a=n(33),u=n(69),l=a.set,c=a.getterFor("Array Iterator");t.exports=u(Array,"Array",(function(t,e){l(this,{type:"Array Iterator",target:o(t),index:0,kind:e})}),(function(){var t=c(this),e=t.target,n=t.kind,o=t.index++;return!e||o>=e.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:o,done:!1}:"values"==n?{value:e[o],done:!1}:{value:[o,e[o]],done:!1}}),"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,e,n){"use strict";var o,r,i,a,u=n(5),l=n(34),c=n(8),s=n(37),f=n(99),d=n(46),p=n(100),A=n(29),h=n(101),v=n(13),g=n(32),m=n(76),y=n(28),w=n(91),x=n(61),b=n(163),E=n(102),_=n(103).set,M=n(164),C=n(105),S=n(165),B=n(78),k=n(106),I=n(33),N=n(90),T=n(9),R=n(79),D=T("species"),Q="Promise",H=I.get,P=I.set,F=I.getterFor(Q),O=f,L=c.TypeError,j=c.document,U=c.process,Y=s("fetch"),z=B.f,G=z,$="process"==y(U),J=!!(j&&j.createEvent&&c.dispatchEvent),V=N(Q,(function(){if(!(w(O)!==String(O))){if(66===R)return!0;if(!$&&"function"!=typeof PromiseRejectionEvent)return!0}if(l&&!O.prototype.finally)return!0;if(R>=51&&/native code/.test(O))return!1;var t=O.resolve(1),e=function(t){t((function(){}),(function(){}))};return(t.constructor={})[D]=e,!(t.then((function(){}))instanceof e)})),K=V||!b((function(t){O.all(t).catch((function(){}))})),W=function(t){var e;return!(!v(t)||"function"!=typeof(e=t.then))&&e},X=function(t,e,n){if(!e.notified){e.notified=!0;var o=e.reactions;M((function(){for(var r=e.value,i=1==e.state,a=0;o.length>a;){var u,l,c,s=o[a++],f=i?s.ok:s.fail,d=s.resolve,p=s.reject,A=s.domain;try{f?(i||(2===e.rejection&&et(t,e),e.rejection=1),!0===f?u=r:(A&&A.enter(),u=f(r),A&&(A.exit(),c=!0)),u===s.promise?p(L("Promise-chain cycle")):(l=W(u))?l.call(u,d,p):d(u)):p(r)}catch(t){A&&!c&&A.exit(),p(t)}}e.reactions=[],e.notified=!1,n&&!e.rejection&&Z(t,e)}))}},q=function(t,e,n){var o,r;J?((o=j.createEvent("Event")).promise=e,o.reason=n,o.initEvent(t,!1,!0),c.dispatchEvent(o)):o={promise:e,reason:n},(r=c["on"+t])?r(o):"unhandledrejection"===t&&S("Unhandled promise rejection",n)},Z=function(t,e){_.call(c,(function(){var n,o=e.value;if(tt(e)&&(n=k((function(){$?U.emit("unhandledRejection",o,t):q("unhandledrejection",t,o)})),e.rejection=$||tt(e)?2:1,n.error))throw n.value}))},tt=function(t){return 1!==t.rejection&&!t.parent},et=function(t,e){_.call(c,(function(){$?U.emit("rejectionHandled",t):q("rejectionhandled",t,e.value)}))},nt=function(t,e,n,o){return function(r){t(e,n,r,o)}},ot=function(t,e,n,o){e.done||(e.done=!0,o&&(e=o),e.value=n,e.state=2,X(t,e,!0))},rt=function(t,e,n,o){if(!e.done){e.done=!0,o&&(e=o);try{if(t===n)throw L("Promise can't be resolved itself");var r=W(n);r?M((function(){var o={done:!1};try{r.call(n,nt(rt,t,o,e),nt(ot,t,o,e))}catch(n){ot(t,o,n,e)}})):(e.value=n,e.state=1,X(t,e,!1))}catch(n){ot(t,{done:!1},n,e)}}};V&&(O=function(t){m(this,O,Q),g(t),o.call(this);var e=H(this);try{t(nt(rt,this,e),nt(ot,this,e))}catch(t){ot(this,e,t)}},(o=function(t){P(this,{type:Q,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=p(O.prototype,{then:function(t,e){var n=F(this),o=z(E(this,O));return o.ok="function"!=typeof t||t,o.fail="function"==typeof e&&e,o.domain=$?U.domain:void 0,n.parent=!0,n.reactions.push(o),0!=n.state&&X(this,n,!1),o.promise},catch:function(t){return this.then(void 0,t)}}),r=function(){var t=new o,e=H(t);this.promise=t,this.resolve=nt(rt,t,e),this.reject=nt(ot,t,e)},B.f=z=function(t){return t===O||t===i?new r(t):G(t)},l||"function"!=typeof f||(a=f.prototype.then,d(f.prototype,"then",(function(t,e){var n=this;return new O((function(t,e){a.call(n,t,e)})).then(t,e)}),{unsafe:!0}),"function"==typeof Y&&u({global:!0,enumerable:!0,forced:!0},{fetch:function(t){return C(O,Y.apply(c,arguments))}}))),u({global:!0,wrap:!0,forced:V},{Promise:O}),A(O,Q,!1,!0),h(Q),i=s(Q),u({target:Q,stat:!0,forced:V},{reject:function(t){var e=z(this);return e.reject.call(void 0,t),e.promise}}),u({target:Q,stat:!0,forced:l||V},{resolve:function(t){return C(l&&this===i?O:this,t)}}),u({target:Q,stat:!0,forced:K},{all:function(t){var e=this,n=z(e),o=n.resolve,r=n.reject,i=k((function(){var n=g(e.resolve),i=[],a=0,u=1;x(t,(function(t){var l=a++,c=!1;i.push(void 0),u++,n.call(e,t).then((function(t){c||(c=!0,i[l]=t,--u||o(i))}),r)})),--u||o(i)}));return i.error&&r(i.value),n.promise},race:function(t){var e=this,n=z(e),o=n.reject,r=k((function(){var r=g(e.resolve);x(t,(function(t){r.call(e,t).then(n.resolve,o)}))}));return r.error&&o(r.value),n.promise}})},function(t,e,n){var o=n(9),r=n(38),i=o("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||a[i]===t)}},function(t,e,n){var o=n(60),r=n(38),i=n(9)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||r[o(t)]}},function(t,e,n){var o=n(20);t.exports=function(t,e,n,r){try{return r?e(o(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&o(i.call(t)),e}}},function(t,e,n){var o=n(9)("iterator"),r=!1;try{var i=0,a={next:function(){return{done:!!i++}},return:function(){r=!0}};a[o]=function(){return this},Array.from(a,(function(){throw 2}))}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var i={};i[o]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},function(t,e,n){var o,r,i,a,u,l,c,s,f=n(8),d=n(65).f,p=n(28),A=n(103).set,h=n(104),v=f.MutationObserver||f.WebKitMutationObserver,g=f.process,m=f.Promise,y="process"==p(g),w=d(f,"queueMicrotask"),x=w&&w.value;x||(o=function(){var t,e;for(y&&(t=g.domain)&&t.exit();r;){e=r.fn,r=r.next;try{e()}catch(t){throw r?a():i=void 0,t}}i=void 0,t&&t.enter()},y?a=function(){g.nextTick(o)}:v&&!h?(u=!0,l=document.createTextNode(""),new v(o).observe(l,{characterData:!0}),a=function(){l.data=u=!u}):m&&m.resolve?(c=m.resolve(void 0),s=c.then,a=function(){s.call(c,o)}):a=function(){A.call(f,o)}),t.exports=x||function(t){var e={fn:t,next:void 0};i&&(i.next=e),r||(r=e,a()),i=e}},function(t,e,n){var o=n(8);t.exports=function(t,e){var n=o.console;n&&n.error&&(1===arguments.length?n.error(t):n.error(t,e))}},function(t,e,n){"use strict";var o=n(5),r=n(32),i=n(78),a=n(106),u=n(61);o({target:"Promise",stat:!0},{allSettled:function(t){var e=this,n=i.f(e),o=n.resolve,l=n.reject,c=a((function(){var n=r(e.resolve),i=[],a=0,l=1;u(t,(function(t){var r=a++,u=!1;i.push(void 0),l++,n.call(e,t).then((function(t){u||(u=!0,i[r]={status:"fulfilled",value:t},--l||o(i))}),(function(t){u||(u=!0,i[r]={status:"rejected",reason:t},--l||o(i))}))})),--l||o(i)}));return c.error&&l(c.value),n.promise}})},function(t,e,n){"use strict";var o=n(5),r=n(34),i=n(99),a=n(12),u=n(37),l=n(102),c=n(105),s=n(46);o({target:"Promise",proto:!0,real:!0,forced:!!i&&a((function(){i.prototype.finally.call({then:function(){}},(function(){}))}))},{finally:function(t){var e=l(this,u("Promise")),n="function"==typeof t;return this.then(n?function(n){return c(e,t()).then((function(){return n}))}:t,n?function(n){return c(e,t()).then((function(){throw n}))}:t)}}),r||"function"!=typeof i||i.prototype.finally||s(i.prototype,"finally",u("Promise").prototype.finally)},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=o(n(1)),a=o(n(3)),u=a.default?function(t,e,n,o){void 0===o&&(o=n),(0,i.default)(t,o,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,o){void 0===o&&(o=n),t[o]=e[n]},l=a.default?function(t,e){(0,i.default)(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e},c=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&u(e,t,n);return l(e,t),e},s=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var f=s(n(2)),d=n(7),p=s(n(254)),A=s(n(268)),h=s(n(270)),v=s(n(271)),g=s(n(289)),m=s(n(365)),y=s(n(366)),w=s(n(367)),x=s(n(368)),b=c(n(369)),E=s(n(372)),_=s(n(373)),M=s(n(375)),C=s(n(24)),S=s(n(123)),B=s(n(19)),k=s(n(27)),I=s(n(31)),N=s(n(41)),T=1,R=function(){function t(t,e){if(this.beforeDestroyHooks=[],this.id="wangEditor-"+T++,this.toolbarSelector=t,this.textSelector=e,null==t)throw new Error("错误：初始化编辑器时候未传入任何参数，请查阅文档");this.config=d.deepClone(p.default),this.$toolbarElem=f.default("<div></div>"),this.$textContainerElem=f.default("<div></div>"),this.$textElem=f.default("<div></div>"),this.toolbarElemId="",this.textElemId="",this.isFocus=!1,this.isComposing=!1,this.isCompatibleMode=!1,this.selection=new A.default(this),this.cmd=new h.default(this),this.txt=new v.default(this),this.menus=new g.default(this),this.zIndex=new E.default,this.change=new _.default(this),this.history=new M.default(this)}return t.prototype.initSelection=function(t){y.default(this,t)},t.prototype.create=function(){this.zIndex.init(this),this.isCompatibleMode=this.config.compatibleMode(),x.default(this),m.default(this),this.txt.init(),this.menus.init(),b.default(this),this.initSelection(!0),w.default(this),this.change.observe(),this.history.observe()},t.prototype.beforeDestroy=function(t){return this.beforeDestroyHooks.push(t),this},t.prototype.destroy=function(){var t,e=this;(0,r.default)(t=this.beforeDestroyHooks).call(t,(function(t){return t.call(e)})),this.$toolbarElem.remove(),this.$textContainerElem.remove()},t.prototype.fullScreen=function(){b.setFullScreen(this)},t.prototype.unFullScreen=function(){b.setUnFullScreen(this)},t.menuConstructors={},t.$=f.default,t}();R.menuConstructors={BtnMenu:C.default,DropList:S.default,DropListMenu:B.default,Panel:k.default,PanelMenu:I.default,Tooltip:N.default},e.default=R},function(t,e,n){n(47);var o=n(170),r=n(60),i=Array.prototype,a={DOMTokenList:!0,NodeList:!0};t.exports=function(t){var e=t.forEach;return t===i||t instanceof Array&&e===i.forEach||a.hasOwnProperty(r(t))?o:e}},function(t,e,n){var o=n(171);t.exports=o},function(t,e,n){n(172);var o=n(17);t.exports=o("Array").forEach},function(t,e,n){"use strict";var o=n(5),r=n(173);o({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},function(t,e,n){"use strict";var o=n(39).forEach,r=n(107),i=n(26),a=r("forEach"),u=i("forEach");t.exports=a&&u?[].forEach:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}},function(t,e,n){var o=n(175);t.exports=o},function(t,e,n){n(176);var o=n(11).Object;t.exports=function(t,e){return o.create(t,e)}},function(t,e,n){n(5)({target:"Object",stat:!0,sham:!n(14)},{create:n(58)})},function(t,e,n){var o=n(178);t.exports=o},function(t,e,n){var o=n(179),r=n(181),i=Array.prototype,a=String.prototype;t.exports=function(t){var e=t.includes;return t===i||t instanceof Array&&e===i.includes?o:"string"==typeof t||t===a||t instanceof String&&e===a.includes?r:e}},function(t,e,n){n(180);var o=n(17);t.exports=o("Array").includes},function(t,e,n){"use strict";var o=n(5),r=n(71).includes,i=n(75);o({target:"Array",proto:!0,forced:!n(26)("indexOf",{ACCESSORS:!0,1:0})},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},function(t,e,n){n(182);var o=n(17);t.exports=o("String").includes},function(t,e,n){"use strict";var o=n(5),r=n(183),i=n(43);o({target:"String",proto:!0,forced:!n(185)("includes")},{includes:function(t){return!!~String(i(this)).indexOf(r(t),arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){var o=n(184);t.exports=function(t){if(o(t))throw TypeError("The method doesn't accept regular expressions");return t}},function(t,e,n){var o=n(13),r=n(28),i=n(9)("match");t.exports=function(t){var e;return o(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==r(t))}},function(t,e,n){var o=n(9)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[o]=!1,"/./"[t](e)}catch(t){}}return!1}},function(t,e,n){var o=n(187);t.exports=o},function(t,e,n){var o=n(188),r=Array.prototype;t.exports=function(t){var e=t.filter;return t===r||t instanceof Array&&e===r.filter?o:e}},function(t,e,n){n(189);var o=n(17);t.exports=o("Array").filter},function(t,e,n){"use strict";var o=n(5),r=n(39).filter,i=n(49),a=n(26),u=i("filter"),l=a("filter");o({target:"Array",proto:!0,forced:!u||!l},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){var o=n(191);t.exports=o},function(t,e,n){var o=n(192),r=Array.prototype;t.exports=function(t){var e=t.splice;return t===r||t instanceof Array&&e===r.splice?o:e}},function(t,e,n){n(193);var o=n(17);t.exports=o("Array").splice},function(t,e,n){"use strict";var o=n(5),r=n(72),i=n(55),a=n(36),u=n(35),l=n(80),c=n(83),s=n(49),f=n(26),d=s("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),A=Math.max,h=Math.min;o({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var n,o,s,f,d,p,v=u(this),g=a(v.length),m=r(t,g),y=arguments.length;if(0===y?n=o=0:1===y?(n=0,o=g-m):(n=y-2,o=h(A(i(e),0),g-m)),g+n-o>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(s=l(v,o),f=0;f<o;f++)(d=m+f)in v&&c(s,f,v[d]);if(s.length=o,n<o){for(f=m;f<g-o;f++)p=f+n,(d=f+o)in v?v[p]=v[d]:delete v[p];for(f=g;f>g-o+n;f--)delete v[f-1]}else if(n>o)for(f=g-o;f>m;f--)p=f+n-1,(d=f+o-1)in v?v[p]=v[d]:delete v[p];for(f=0;f<n;f++)v[f+m]=arguments[f+2];return v.length=g-o+n,s}})},function(t,e,n){var o=n(195);t.exports=o},function(t,e,n){var o=n(196),r=Array.prototype;t.exports=function(t){var e=t.indexOf;return t===r||t instanceof Array&&e===r.indexOf?o:e}},function(t,e,n){n(197);var o=n(17);t.exports=o("Array").indexOf},function(t,e,n){"use strict";var o=n(5),r=n(71).indexOf,i=n(107),a=n(26),u=[].indexOf,l=!!u&&1/[1].indexOf(1,-0)<0,c=i("indexOf"),s=a("indexOf",{ACCESSORS:!0,1:0});o({target:"Array",proto:!0,forced:l||!c||!s},{indexOf:function(t){return l?u.apply(this,arguments)||0:r(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){var o=n(199);t.exports=o},function(t,e,n){n(200),n(53),n(54),n(47);var o=n(11);t.exports=o.Map},function(t,e,n){"use strict";var o=n(110),r=n(112);t.exports=o("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r)},function(t,e,n){var o=n(12);t.exports=!o((function(){return Object.isExtensible(Object.preventExtensions({}))}))},function(t,e,n){var o=n(203);t.exports=o},function(t,e,n){var o=n(204),r=String.prototype;t.exports=function(t){var e=t.trim;return"string"==typeof t||t===r||t instanceof String&&e===r.trim?o:e}},function(t,e,n){n(205);var o=n(17);t.exports=o("String").trim},function(t,e,n){"use strict";var o=n(5),r=n(84).trim;o({target:"String",proto:!0,forced:n(206)("trim")},{trim:function(){return r(this)}})},function(t,e,n){var o=n(12),r=n(62);t.exports=function(t){return o((function(){return!!r[t]()||"​᠎"!="​᠎"[t]()||r[t].name!==t}))}},function(t,e,n){var o=n(208);t.exports=o},function(t,e,n){var o=n(209),r=Array.prototype;t.exports=function(t){var e=t.map;return t===r||t instanceof Array&&e===r.map?o:e}},function(t,e,n){n(210);var o=n(17);t.exports=o("Array").map},function(t,e,n){"use strict";var o=n(5),r=n(39).map,i=n(49),a=n(26),u=i("map"),l=a("map");o({target:"Array",proto:!0,forced:!u||!l},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){var o=n(212);t.exports=o},function(t,e,n){n(213);var o=n(11);t.exports=o.Array.isArray},function(t,e,n){n(5)({target:"Array",stat:!0},{isArray:n(48)})},function(t,e,n){t.exports=n(215)},function(t,e,n){var o=n(216);t.exports=o},function(t,e,n){n(115),n(54),n(47);var o=n(85);t.exports=o.f("iterator")},function(t,e,n){t.exports=n(218)},function(t,e,n){var o=n(219);n(238),n(239),n(240),n(241),n(242),t.exports=o},function(t,e,n){n(220),n(53),n(221),n(223),n(224),n(225),n(226),n(115),n(227),n(228),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(236),n(237);var o=n(11);t.exports=o.Symbol},function(t,e,n){"use strict";var o=n(5),r=n(12),i=n(48),a=n(13),u=n(35),l=n(36),c=n(83),s=n(80),f=n(49),d=n(9),p=n(79),A=d("isConcatSpreadable"),h=p>=51||!r((function(){var t=[];return t[A]=!1,t.concat()[0]!==t})),v=f("concat"),g=function(t){if(!a(t))return!1;var e=t[A];return void 0!==e?!!e:i(t)};o({target:"Array",proto:!0,forced:!h||!v},{concat:function(t){var e,n,o,r,i,a=u(this),f=s(a,0),d=0;for(e=-1,o=arguments.length;e<o;e++)if(g(i=-1===e?a:arguments[e])){if(d+(r=l(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<r;n++,d++)n in i&&c(f,d,i[n])}else{if(d>=9007199254740991)throw TypeError("Maximum allowed index exceeded");c(f,d++,i)}return f.length=d,f}})},function(t,e,n){"use strict";var o=n(5),r=n(8),i=n(37),a=n(34),u=n(14),l=n(70),c=n(95),s=n(12),f=n(15),d=n(48),p=n(13),A=n(20),h=n(35),v=n(25),g=n(52),m=n(42),y=n(58),w=n(59),x=n(116),b=n(222),E=n(117),_=n(65),M=n(16),C=n(51),S=n(18),B=n(46),k=n(68),I=n(56),N=n(45),T=n(57),R=n(9),D=n(85),Q=n(10),H=n(29),P=n(33),F=n(39).forEach,O=I("hidden"),L=R("toPrimitive"),j=P.set,U=P.getterFor("Symbol"),Y=Object.prototype,z=r.Symbol,G=i("JSON","stringify"),$=_.f,J=M.f,V=b.f,K=C.f,W=k("symbols"),X=k("op-symbols"),q=k("string-to-symbol-registry"),Z=k("symbol-to-string-registry"),tt=k("wks"),et=r.QObject,nt=!et||!et.prototype||!et.prototype.findChild,ot=u&&s((function(){return 7!=y(J({},"a",{get:function(){return J(this,"a",{value:7}).a}})).a}))?function(t,e,n){var o=$(Y,e);o&&delete Y[e],J(t,e,n),o&&t!==Y&&J(Y,e,o)}:J,rt=function(t,e){var n=W[t]=y(z.prototype);return j(n,{type:"Symbol",tag:t,description:e}),u||(n.description=e),n},it=c?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof z},at=function(t,e,n){t===Y&&at(X,e,n),A(t);var o=g(e,!0);return A(n),f(W,o)?(n.enumerable?(f(t,O)&&t[O][o]&&(t[O][o]=!1),n=y(n,{enumerable:m(0,!1)})):(f(t,O)||J(t,O,m(1,{})),t[O][o]=!0),ot(t,o,n)):J(t,o,n)},ut=function(t,e){A(t);var n=v(e),o=w(n).concat(ft(n));return F(o,(function(e){u&&!lt.call(n,e)||at(t,e,n[e])})),t},lt=function(t){var e=g(t,!0),n=K.call(this,e);return!(this===Y&&f(W,e)&&!f(X,e))&&(!(n||!f(this,e)||!f(W,e)||f(this,O)&&this[O][e])||n)},ct=function(t,e){var n=v(t),o=g(e,!0);if(n!==Y||!f(W,o)||f(X,o)){var r=$(n,o);return!r||!f(W,o)||f(n,O)&&n[O][o]||(r.enumerable=!0),r}},st=function(t){var e=V(v(t)),n=[];return F(e,(function(t){f(W,t)||f(N,t)||n.push(t)})),n},ft=function(t){var e=t===Y,n=V(e?X:v(t)),o=[];return F(n,(function(t){!f(W,t)||e&&!f(Y,t)||o.push(W[t])})),o};(l||(B((z=function(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=T(t),n=function(t){this===Y&&n.call(X,t),f(this,O)&&f(this[O],e)&&(this[O][e]=!1),ot(this,e,m(1,t))};return u&&nt&&ot(Y,e,{configurable:!0,set:n}),rt(e,t)}).prototype,"toString",(function(){return U(this).tag})),B(z,"withoutSetter",(function(t){return rt(T(t),t)})),C.f=lt,M.f=at,_.f=ct,x.f=b.f=st,E.f=ft,D.f=function(t){return rt(R(t),t)},u&&(J(z.prototype,"description",{configurable:!0,get:function(){return U(this).description}}),a||B(Y,"propertyIsEnumerable",lt,{unsafe:!0}))),o({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:z}),F(w(tt),(function(t){Q(t)})),o({target:"Symbol",stat:!0,forced:!l},{for:function(t){var e=String(t);if(f(q,e))return q[e];var n=z(e);return q[e]=n,Z[n]=e,n},keyFor:function(t){if(!it(t))throw TypeError(t+" is not a symbol");if(f(Z,t))return Z[t]},useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),o({target:"Object",stat:!0,forced:!l,sham:!u},{create:function(t,e){return void 0===e?y(t):ut(y(t),e)},defineProperty:at,defineProperties:ut,getOwnPropertyDescriptor:ct}),o({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:st,getOwnPropertySymbols:ft}),o({target:"Object",stat:!0,forced:s((function(){E.f(1)}))},{getOwnPropertySymbols:function(t){return E.f(h(t))}}),G)&&o({target:"JSON",stat:!0,forced:!l||s((function(){var t=z();return"[null]"!=G([t])||"{}"!=G({a:t})||"{}"!=G(Object(t))}))},{stringify:function(t,e,n){for(var o,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);if(o=e,(p(e)||void 0!==t)&&!it(t))return d(e)||(e=function(t,e){if("function"==typeof o&&(e=o.call(this,t,e)),!it(e))return e}),r[1]=e,G.apply(null,r)}});z.prototype[L]||S(z.prototype,L,z.prototype.valueOf),H(z,"Symbol"),N[O]=!0},function(t,e,n){var o=n(25),r=n(116).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?function(t){try{return r(t)}catch(t){return a.slice()}}(t):r(o(t))}},function(t,e,n){n(10)("asyncIterator")},function(t,e){},function(t,e,n){n(10)("hasInstance")},function(t,e,n){n(10)("isConcatSpreadable")},function(t,e,n){n(10)("match")},function(t,e,n){n(10)("matchAll")},function(t,e,n){n(10)("replace")},function(t,e,n){n(10)("search")},function(t,e,n){n(10)("species")},function(t,e,n){n(10)("split")},function(t,e,n){n(10)("toPrimitive")},function(t,e,n){n(10)("toStringTag")},function(t,e,n){n(10)("unscopables")},function(t,e,n){n(29)(Math,"Math",!0)},function(t,e,n){var o=n(8);n(29)(o.JSON,"JSON",!0)},function(t,e,n){n(10)("asyncDispose")},function(t,e,n){n(10)("dispose")},function(t,e,n){n(10)("observable")},function(t,e,n){n(10)("patternMatch")},function(t,e,n){n(10)("replaceAll")},function(t,e,n){n(244);var o=n(11);t.exports=o.setTimeout},function(t,e,n){var o=n(5),r=n(8),i=n(77),a=[].slice,u=function(t){return function(e,n){var o=arguments.length>2,r=o?a.call(arguments,2):void 0;return t(o?function(){("function"==typeof e?e:Function(e)).apply(this,r)}:e,n)}};o({global:!0,bind:!0,forced:/MSIE .\./.test(i)},{setTimeout:u(r.setTimeout),setInterval:u(r.setInterval)})},function(t,e,n){var o=n(246);t.exports=o},function(t,e,n){var o=n(247),r=Array.prototype;t.exports=function(t){var e=t.slice;return t===r||t instanceof Array&&e===r.slice?o:e}},function(t,e,n){n(248);var o=n(17);t.exports=o("Array").slice},function(t,e,n){"use strict";var o=n(5),r=n(13),i=n(48),a=n(72),u=n(36),l=n(25),c=n(83),s=n(9),f=n(49),d=n(26),p=f("slice"),A=d("slice",{ACCESSORS:!0,0:0,1:2}),h=s("species"),v=[].slice,g=Math.max;o({target:"Array",proto:!0,forced:!p||!A},{slice:function(t,e){var n,o,s,f=l(this),d=u(f.length),p=a(t,d),A=a(void 0===e?d:e,d);if(i(f)&&("function"!=typeof(n=f.constructor)||n!==Array&&!i(n.prototype)?r(n)&&null===(n=n[h])&&(n=void 0):n=void 0,n===Array||void 0===n))return v.call(f,p,A);for(o=new(void 0===n?Array:n)(g(A-p,0)),s=0;p<A;p++,s++)p in f&&c(o,s,f[p]);return o.length=s,o}})},function(t,e,n){t.exports=n(250)},function(t,e,n){var o=n(251);t.exports=o},function(t,e,n){n(252);var o=n(11);t.exports=o.parseInt},function(t,e,n){var o=n(5),r=n(253);o({global:!0,forced:parseInt!=r},{parseInt:r})},function(t,e,n){var o=n(8),r=n(84).trim,i=n(62),a=o.parseInt,u=/^[+-]?0[Xx]/,l=8!==a(i+"08")||22!==a(i+"0x16");t.exports=l?function(t,e){var n=r(String(t));return a(n,e>>>0||(u.test(n)?16:10))}:a},function(t,e,n){"use strict";var o=n(0),r=o(n(255)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=i(n(260)),u=i(n(261)),l=i(n(119)),c=i(n(262)),s=i(n(263)),f=i(n(264)),d=i(n(265)),p=i(n(266)),A=i(n(267)),h=(0,r.default)({},a.default,u.default,l.default,s.default,c.default,f.default,d.default,p.default,A.default,{linkCheck:function(t,e){return!0}},{linkImgCheck:function(t){return!0}});e.default=h},function(t,e,n){t.exports=n(256)},function(t,e,n){var o=n(257);t.exports=o},function(t,e,n){n(258);var o=n(11);t.exports=o.Object.assign},function(t,e,n){var o=n(5),r=n(259);o({target:"Object",stat:!0,forced:Object.assign!==r},{assign:r})},function(t,e,n){"use strict";var o=n(14),r=n(12),i=n(59),a=n(117),u=n(51),l=n(35),c=n(66),s=Object.assign,f=Object.defineProperty;t.exports=!s||r((function(){if(o&&1!==s({b:1},s(f({},"a",{enumerable:!0,get:function(){f(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol();return t[n]=7,"abcdefghijklmnopqrst".split("").forEach((function(t){e[t]=t})),7!=s({},t)[n]||"abcdefghijklmnopqrst"!=i(s({},e)).join("")}))?function(t,e){for(var n=l(t),r=arguments.length,s=1,f=a.f,d=u.f;r>s;)for(var p,A=c(arguments[s++]),h=f?i(A).concat(f(A)):i(A),v=h.length,g=0;v>g;)p=h[g++],o&&!d.call(A,p)||(n[p]=A[p]);return n}:s},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var o="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal",r="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal";e.default={menus:["head","bold","fontSize","fontName","italic","underline","strikeThrough","indent","lineHeight","foreColor","backColor","link","list","justify","quote","emoticon","image","video","table","code","splitLine","undo","redo"],fontNames:["黑体","仿宋","楷体","标楷体","华文仿宋","华文楷体","宋体","微软雅黑","Arial","Tahoma","Verdana","Times New Roman","Courier New"],fontSizes:{"x-small":{name:"10px",value:"1"},small:{name:"13px",value:"2"},normal:{name:"16px",value:"3"},large:{name:"18px",value:"4"},"x-large":{name:"24px",value:"5"},"xx-large":{name:"32px",value:"6"},"xxx-large":{name:"48px",value:"7"}},colors:["#000000","#eeece0","#1c487f","#4d80bf","#c24f4a","#8baa4a","#7b5ba1","#46acc8","#f9963b","#ffffff"],languageType:["Bash","C","C#","C++","CSS","Java","JavaScript","JSON","TypeScript","Plain text","Html","XML","SQL","Go","Kotlin","Lua","Markdown","PHP","Python","Shell Session","Ruby"],languageTab:"　　　　",emotions:[{title:"默认",type:"image",content:[{alt:"[坏笑]",src:o+"/50/pcmoren_huaixiao_org.png"},{alt:"[舔屏]",src:o+"/40/pcmoren_tian_org.png"},{alt:"[污]",src:o+"/3c/pcmoren_wu_org.png"}]},{title:"新浪",type:"image",content:[{src:r+"/7a/shenshou_thumb.gif",alt:"[草泥马]"},{src:r+"/60/horse2_thumb.gif",alt:"[神马]"},{src:r+"/bc/fuyun_thumb.gif",alt:"[浮云]"}]},{title:"emoji",type:"emoji",content:"😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐".split(/\s/)},{title:"手势",type:"emoji",content:["🙌","👏","👋","👍","👎","👊","✊","️👌","✋","👐","💪","🙏","️👆","👇","👈","👉","🖕","🖐","🤘"]}],lineHeights:["1","1.15","1.6","2","2.5","3"],undoLimit:20}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var o=n(30);e.default={onchangeTimeout:200,onchange:o.EMPTY_FN,onfocus:o.EMPTY_FN,onblur:o.EMPTY_FN}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default={pasteFilterStyle:!0,pasteIgnoreImg:!1,pasteTextHandle:function(t){return t}}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default={styleWithCSS:!1}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var o=n(30);e.default={showLinkImg:!0,linkImgCallback:o.EMPTY_FN,uploadImgServer:"",uploadImgShowBase64:!1,uploadImgMaxSize:5242880,uploadImgMaxLength:100,uploadFileName:"",uploadImgParams:{},uploadImgParamsWithUrl:!1,uploadImgHeaders:{},uploadImgHooks:{},uploadImgTimeout:1e4,withCredentials:!1,customUploadImg:null}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default={focus:!0,height:300,placeholder:"请输入正文",zIndexFullScreen:1e4,showFullScreen:!0}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default={lang:"zh-CN",languages:{"zh-CN":{wangEditor:{"插入":"插入","默认":"默认","创建":"创建","修改":"修改","如":"如","请输入正文":"请输入正文",menus:{dropListMenu:{"设置标题":"设置标题","背景颜色":"背景颜色","文字颜色":"文字颜色","设置字号":"设置字号","设置字体":"设置字体","设置缩进":"设置缩进","对齐方式":"对齐方式","设置行高":"设置行高","序列":"序列",head:{"正文":"正文"},indent:{"增加缩进":"增加缩进","减少缩进":"减少缩进"},justify:{"靠左":"靠左","居中":"居中","靠右":"靠右"},list:{"无序列表":"无序列表","有序列表":"有序列表"}},panelMenus:{emoticon:{"默认":"默认","新浪":"新浪",emoji:"emoji","手势":"手势"},image:{"图片链接":"图片链接","上传图片":"上传图片","网络图片":"网络图片"},link:{"链接":"链接","链接文字":"链接文字","取消链接":"取消链接","查看链接":"查看链接"},video:{"插入视频":"插入视频"},table:{"行":"行","列":"列","的":"的","表格":"表格","添加行":"添加行","删除行":"删除行","添加列":"添加列","删除列":"删除列","设置表头":"设置表头","取消表头":"取消表头","插入表格":"插入表格","删除表格":"删除表格"},code:{"删除代码":"删除代码","修改代码":"修改代码","插入代码":"插入代码"}}},validate:{"张图片":"张图片","大于":"大于","图片链接":"图片链接","不是图片":"不是图片","返回结果":"返回结果","上传图片超时":"上传图片超时","上传图片错误":"上传图片错误","上传图片失败":"上传图片失败","插入图片错误":"插入图片错误","一次最多上传":"一次最多上传","下载链接失败":"下载链接失败","图片验证未通过":"图片验证未通过","服务器返回状态":"服务器返回状态","上传图片返回结果错误":"上传图片返回结果错误","请替换为支持的图片类型":"请替换为支持的图片类型","您插入的网络图片无法识别":"您插入的网络图片无法识别","您刚才插入的图片链接未通过编辑器校验":"您刚才插入的图片链接未通过编辑器校验"}}},en:{wangEditor:{"插入":"insert","默认":"default","创建":"create","修改":"edit","如":"like","请输入正文":"please enter the text",menus:{dropListMenu:{"设置标题":"title","背景颜色":"background","文字颜色":"font color","设置字号":"font size","设置字体":"font family","设置缩进":"indent","对齐方式":"align","设置行高":"line heihgt","序列":"list",head:{"正文":"text"},indent:{"增加缩进":"indent","减少缩进":"outdent"},justify:{"靠左":"left","居中":"center","靠右":"right"},list:{"无序列表":"unordered","有序列表":"ordered"}},panelMenus:{emoticon:{"默认":"default","新浪":"sina",emoji:"emoji","手势":"gesture"},image:{"图片链接":"image link","上传图片":"upload image","网络图片":"network image"},link:{"链接":"link","链接文字":"link text","取消链接":"unlink","查看链接":"view links"},video:{"插入视频":"insert video"},table:{"行":"rows","列":"columns","的":" ","表格":"table","添加行":"insert row","删除行":"delete row","添加列":"insert column","删除列":"delete column","设置表头":"set header","取消表头":"cancel header","插入表格":"insert table","删除表格":"delete table"},code:{"删除代码":"delete code","修改代码":"edit code","插入代码":"insert code"}}},validate:{"张图片":"images","大于":"greater than","图片链接":"image link","不是图片":"is not image","返回结果":"return results","上传图片超时":"upload image timeout","上传图片错误":"upload image error","上传图片失败":"upload image failed","插入图片错误":"insert image error","一次最多上传":"once most at upload","下载链接失败":"download link failed","图片验证未通过":"image validate failed","服务器返回状态":"server return status","上传图片返回结果错误":"upload image return results error","请替换为支持的图片类型":"please replace with a supported image type","您插入的网络图片无法识别":"the network picture you inserted is not recognized","您刚才插入的图片链接未通过编辑器校验":"the image link you just inserted did not pass the editor verification"}}}}}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var o=n(7);e.default={compatibleMode:function(){return!(!o.UA.isIE()&&!o.UA.isOldEdge)},historyMaxSize:30}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2)),i=n(7),a=o(n(269)),u=function(){function t(t){this.editor=t,this._currentRange=null}return t.prototype.getRange=function(){return this._currentRange},t.prototype.saveRange=function(t){if(t)this._currentRange=t;else{var e=window.getSelection();if(0!==e.rangeCount){var n=e.getRangeAt(0),o=this.getSelectionContainerElem(n);if(o)if("false"!==o.attr("contenteditable")&&!o.parentUntil("[contenteditable=false]"))this.editor.$textElem.isContain(o)&&(this._currentRange=n)}}},t.prototype.collapseRange=function(t){void 0===t&&(t=!1);var e=this._currentRange;e&&e.collapse(t)},t.prototype.getSelectionText=function(){var t=this._currentRange;return t?t.toString():""},t.prototype.getSelectionContainerElem=function(t){var e,n;if(e=t||this._currentRange)return n=e.commonAncestorContainer,r.default(1===n.nodeType?n:n.parentNode)},t.prototype.getSelectionStartElem=function(t){var e,n;if(e=t||this._currentRange)return n=e.startContainer,r.default(1===n.nodeType?n:n.parentNode)},t.prototype.getSelectionEndElem=function(t){var e,n;if(e=t||this._currentRange)return n=e.endContainer,r.default(1===n.nodeType?n:n.parentNode)},t.prototype.isSelectionEmpty=function(){var t=this._currentRange;return!(!t||!t.startContainer||t.startContainer!==t.endContainer||t.startOffset!==t.endOffset)},t.prototype.restoreSelection=function(){var t=window.getSelection(),e=this._currentRange;t&&e&&(t.removeAllRanges(),t.addRange(e))},t.prototype.createEmptyRange=function(){var t,e=this.editor,n=this.getRange();if(n&&this.isSelectionEmpty())try{i.UA.isWebkit()?(e.cmd.do("insertHTML","&#8203;"),n.setEnd(n.endContainer,n.endOffset+1),this.saveRange(n)):(t=r.default("<strong>&#8203;</strong>"),e.cmd.do("insertElem",t),this.createRangeByElem(t,!0))}catch(t){}},t.prototype.createRangeByElem=function(t,e,n){if(t.length){var o=t.elems[0],r=document.createRange();n?r.selectNodeContents(o):r.selectNode(o),null!=e&&r.collapse(e),this.saveRange(r)}},t.prototype.getSelectionRangeTopNodes=function(t){var e=new a.default(t);return e.init(),e.getSelectionNodes()},t}();e.default=u},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2)),i=function(){function t(t){this.editor=t,this.$nodeList=[],this.$startElem=r.default(t.selection.getSelectionStartElem()).getNodeTop(this.editor),this.$endElem=r.default(t.selection.getSelectionEndElem()).getNodeTop(this.editor)}return t.prototype.init=function(){this.recordSelectionNodes(r.default(this.$startElem))},t.prototype.addNodeList=function(t){this.$nodeList.push(r.default(t))},t.prototype.isEndElem=function(t){var e;return null===(e=this.$endElem)||void 0===e?void 0:e.equal(t)},t.prototype.getNextSibling=function(t){return r.default(t.elems[0].nextSibling)},t.prototype.recordSelectionNodes=function(t){var e=t.getNodeTop(this.editor);e.length>0&&(this.addNodeList(e),this.isEndElem(e)||this.recordSelectionNodes(this.getNextSibling(e)))},t.prototype.getSelectionNodes=function(){return this.$nodeList},t}();e.default=i},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2)),i=function(){function t(t){this.editor=t}return t.prototype.do=function(t,e){var n=this.editor;n.config.styleWithCSS&&document.execCommand("styleWithCSS",!1,"true");var o=n.selection;if(o.getRange()){switch(o.restoreSelection(),t){case"insertHTML":this.insertHTML(e);break;case"insertElem":this.insertElem(e);break;default:this.execCommand(t,e)}n.menus.changeActive(),o.saveRange(),o.restoreSelection()}},t.prototype.insertHTML=function(t){var e=this.editor,n=e.selection.getRange();null!=n&&(this.queryCommandSupported("insertHTML")?this.execCommand("insertHTML",t):n.insertNode&&(n.deleteContents(),n.insertNode(r.default(t).elems[0]),e.selection.collapseRange()))},t.prototype.insertElem=function(t){var e=this.editor.selection.getRange();null!=e&&e.insertNode&&(e.deleteContents(),e.insertNode(t.elems[0]))},t.prototype.execCommand=function(t,e){document.execCommand(t,!1,e)},t.prototype.queryCommandValue=function(t){return document.queryCommandValue(t)},t.prototype.queryCommandState=function(t){return document.queryCommandState(t)},t.prototype.queryCommandSupported=function(t){return document.queryCommandSupported(t)},t}();e.default=i},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=o(n(50)),a=o(n(23)),u=o(n(64)),l=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var c=l(n(2)),s=l(n(276)),f=n(7),d=l(n(288)),p=function(){function t(t){this.editor=t,this.eventHooks={changeEvents:[],dropEvents:[],clickEvents:[],keyupEvents:[],tabUpEvents:[],tabDownEvents:[],enterUpEvents:[],enterDownEvents:[],deleteUpEvents:[],deleteDownEvents:[],pasteEvents:[],linkClickEvents:[],codeClickEvents:[],textScrollEvents:[],toolbarClickEvents:[],imgClickEvents:[],imgDragBarMouseDownEvents:[],tableClickEvents:[],menuClickEvents:[],dropListMenuHoverEvents:[],splitLineEvents:[]}}return t.prototype.init=function(){this._saveRange(),this._bindEventHooks(),s.default(this)},t.prototype.togglePlaceholder=function(){var t,e=this.html(),n=(0,u.default)(t=this.editor.$textContainerElem).call(t,".placeholder");n.hide(),e&&"<p><br></p>"!==e&&" "!==e||n.show()},t.prototype.clear=function(){this.html("<p><br></p>")},t.prototype.html=function(t){var e=this.editor,n=e.$textElem;if(null==t){var o=n.html();return o=(o=(o=o.replace(/\u200b/gm,"")).replace(/<p><\/p>/gim,"")).replace(/<p><br\/?><\/p>$/gim,"")}""===(t=(0,a.default)(t).call(t))&&(t="<p><br></p>"),0!==(0,i.default)(t).call(t,"<")&&(t="<p>"+t+"</p>"),n.html(t),e.initSelection()},t.prototype.getJSON=function(){var t=this.editor.$textElem;return d.default(t)},t.prototype.text=function(t){var e=this.editor,n=e.$textElem;e.$textContainerElem;if(null==t){var o=n.text();return o=o.replace(/\u200b/gm,"")}n.text("<p>"+t+"</p>"),e.initSelection()},t.prototype.append=function(t){var e=this.editor,n=e.$textElem;0!==(0,i.default)(t).call(t,"<")&&(t="<p>"+t+"</p>"),n.append(c.default(t)),e.initSelection()},t.prototype._saveRange=function(){var t=this.editor,e=t.$textElem;function n(){t.selection.saveRange(),t.menus.changeActive()}e.on("keyup",n),e.on("mousedown",(function(){e.on("mouseleave",n)})),e.on("mouseup",(function(){n(),e.off("mouseleave",n)}))},t.prototype._bindEventHooks=function(){var t=this.editor,e=t.$textElem,n=this.eventHooks;function o(t){t.preventDefault()}e.on("click",(function(t){var e=n.clickEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))})),e.on("keyup",(function(t){if(13===t.keyCode){var e=n.enterUpEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}})),e.on("keyup",(function(t){var e=n.keyupEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))})),e.on("keyup",(function(t){if(8===t.keyCode){var e=n.deleteUpEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}})),e.on("keydown",(function(t){if(8===t.keyCode){var e=n.deleteDownEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}})),e.on("paste",(function(t){if(!f.UA.isIE()){t.preventDefault();var e=n.pasteEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}})),e.on("keydown",(function(e){(t.isFocus||t.isCompatibleMode)&&(e.ctrlKey||e.metaKey)&&90===e.keyCode&&(e.preventDefault(),e.shiftKey?t.history.restore():t.history.revoke())})),e.on("keyup",(function(t){if(9===t.keyCode){t.preventDefault();var e=n.tabUpEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}})),e.on("keydown",(function(t){if(9===t.keyCode){t.preventDefault();var e=n.tabDownEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}})),e.on("scroll",f.throttle((function(t){var e=n.textScrollEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}),100)),c.default(document).on("dragleave",o).on("drop",o).on("dragenter",o).on("dragover",o),t.beforeDestroy((function(){c.default(document).off("dragleave",o).off("drop",o).off("dragenter",o).off("dragover",o)})),e.on("drop",(function(t){t.preventDefault();var e=n.dropEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))})),e.on("click",(function(t){var e=null,o=t.target,i=c.default(o);if("A"===i.getNodeName())e=i;else{var a=i.parentUntil("a");null!=a&&(e=a)}if(null!=e){var u=n.linkClickEvents;(0,r.default)(u).call(u,(function(t){return t(e)}))}})),e.on("click",(function(t){var e=null,o=t.target,i=c.default(o);if("IMG"!==i.getNodeName()||i.elems[0].getAttribute("class")&&"eleImg"===i.elems[0].getAttribute("class")||i.elems[0].getAttribute("alt")||(t.stopPropagation(),e=i),null!=e){var a=n.imgClickEvents;(0,r.default)(a).call(a,(function(t){return t(e)}))}})),e.on("click",(function(t){var e=null,o=t.target,i=c.default(o);if("PRE"===i.getNodeName())e=i;else{var a=i.parentUntil("pre");null!=a&&(e=a)}if(null!=e){var u=n.codeClickEvents;(0,r.default)(u).call(u,(function(t){return t(e)}))}})),e.on("click",(function(e){var o=null,i=e.target,a=c.default(i);if("HR"===a.getNodeName()&&(o=a),null!=o){t.selection.createRangeByElem(o),t.selection.restoreSelection();var u=n.splitLineEvents;(0,r.default)(u).call(u,(function(t){return t(o)}))}})),t.$toolbarElem.on("click",(function(t){var e=n.toolbarClickEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))})),t.$textContainerElem.on("mousedown",(function(t){var e=t.target;if(c.default(e).hasClass("w-e-img-drag-rb")){var o=n.imgDragBarMouseDownEvents;(0,r.default)(o).call(o,(function(t){return t()}))}})),e.on("click",(function(t){var e,o=t.target;if(null!=(e=c.default(o).parentUntil("TABLE",o))){var i=n.tableClickEvents;(0,r.default)(i).call(i,(function(t){return t(e)}))}})),e.on("keydown",(function(t){if(13===t.keyCode){var e=n.enterDownEvents;(0,r.default)(e).call(e,(function(e){return e(t)}))}}))},t}();e.default=p},function(t,e,n){var o=n(273);t.exports=o},function(t,e,n){var o=n(274),r=Array.prototype;t.exports=function(t){var e=t.find;return t===r||t instanceof Array&&e===r.find?o:e}},function(t,e,n){n(275);var o=n(17);t.exports=o("Array").find},function(t,e,n){"use strict";var o=n(5),r=n(39).find,i=n(75),a=n(26),u=!0,l=a("find");"find"in[]&&Array(1).find((function(){u=!1})),o({target:"Array",proto:!0,forced:u||!l},{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i("find")},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(277)),i=o(n(278)),a=o(n(279)),u=o(n(280)),l=o(n(287));e.default=function(t){var e=t.editor,n=t.eventHooks;r.default(e,n.enterUpEvents,n.enterDownEvents),i.default(e,n.deleteUpEvents,n.deleteDownEvents),a.default(e,n.tabDownEvents),u.default(e,n.pasteEvents),l.default(e,n.imgClickEvents)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2));e.default=function(t,e,n){function o(e){var n=r.default("<p><br></p>");n.insertBefore(e),t.selection.createRangeByElem(n,!0),t.selection.restoreSelection(),e.remove()}e.push((function(){var e=t.$textElem,n=t.selection.getSelectionContainerElem(),r=n.parent();"<code><br></code>"!==r.html()?r.equal(e)&&"P"!==n.getNodeName()&&(n.text()||o(n)):o(n)})),n.push((function(e){var n;t.selection.saveRange(null===(n=getSelection())||void 0===n?void 0:n.getRangeAt(0)),t.selection.getSelectionContainerElem().id===t.textElemId&&(e.preventDefault(),t.cmd.do("insertHTML","<p><br></p>"))}))}},function(t,e,n){"use strict";var o=n(0),r=o(n(23)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=i(n(2));e.default=function(t,e,n){e.push((function(){var e,n=t.$textElem,o=(0,r.default)(e=n.html().toLowerCase()).call(e);if(!o||"<br>"===o){var i=a.default("<p><br/></p>");n.html(" "),n.append(i),t.selection.createRangeByElem(i,!1,!0),t.selection.restoreSelection()}})),n.push((function(e){var n,o=t.$textElem;"<p><br></p>"!==(0,r.default)(n=o.html().toLowerCase()).call(n)||e.preventDefault()}))}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t,e){e.push((function(){if(t.cmd.queryCommandSupported("insertHTML")){var e=t.selection.getSelectionContainerElem();if(e){var n=e.parent(),o=e.getNodeName(),r=n.getNodeName();"CODE"==o||"CODE"===r||"PRE"===r||/hljs/.test(r)?t.cmd.do("insertHTML",t.config.languageTab):t.cmd.do("insertHTML","&nbsp;&nbsp;&nbsp;&nbsp;")}}}))}},function(t,e,n){"use strict";var o=n(0),r=o(n(23));(0,o(n(1)).default)(e,"__esModule",{value:!0});var i=n(120),a=n(7),u=n(30);function l(t){var e=t;return e=(e=(e=e.replace(/<br>|<br\/>/gim,"")).replace(/<div>/gim,"<p>").replace(/<\/div>/gim,"</p>")).replace(/<p><\/p>/gim,"<p><br></p>"),(0,r.default)(e).call(e)}e.default=function(t,e){e.push((function(e){var n=t.config,o=n.pasteFilterStyle,r=n.pasteIgnoreImg,c=n.pasteTextHandle,s=i.getPasteHtml(e,o,r),f=i.getPasteText(e);f=f.replace(/\n/gm,"<br>");var d=t.selection.getSelectionContainerElem();if(d){var p,A=null==d?void 0:d.getNodeName(),h=null==d?void 0:d.getNodeTop(t),v="";if(h.elems[0]&&(v=null==h?void 0:h.getNodeName()),"CODE"===A||"PRE"===v)return c&&a.isFunction(c)&&(f=""+(c(f)||"")),void t.cmd.do("insertHTML",(p=f,p.replace(/<br>|<br\/>/gm,"\n").replace(/<[^>]+>/gm,"")));if(u.urlRegex.test(f))return t.cmd.do("insertHTML",'<a href="'+f+'" target="_blank">'+f+"</a>");if(s)try{c&&a.isFunction(c)&&(s=""+(c(s)||"")),t.cmd.do("insertHTML",""+l(s))}catch(e){c&&a.isFunction(c)&&(f=""+(c(f)||"")),t.cmd.do("insertHTML",""+l(f))}}}))}},function(t,e,n){"use strict";var o=n(0),r=o(n(108)),i=o(n(6)),a=o(n(23)),u=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var l=n(282),c=u(n(286));function s(t,e){var n;return t=(0,a.default)(n=t.toLowerCase()).call(n),!!l.IGNORE_TAGS.has(t)||!(!e||"img"!==t)}e.default=function(t,e,n){void 0===e&&(e=!0),void 0===n&&(n=!1);var o=[],u="";(new c.default).parse(t,{startElement:function(t,c){if(function(t){(t=(0,a.default)(t).call(t))&&(l.EMPTY_TAGS.has(t)||(u=t))}(t),!s(t,n)){var f=l.NECESSARY_ATTRS.get(t)||[],d=[];(0,i.default)(c).call(c,(function(t){var n=t.name;"style"!==n?!1!==(0,r.default)(f).call(f,n)&&d.push(t):e||d.push(t)}));var p=function(t,e){var n="";n="<"+t;var o=[];return(0,i.default)(e).call(e,(function(t){o.push(t.name+'="'+t.value+'"')})),o.length>0&&(n=n+" "+o.join(" ")),n=n+(l.EMPTY_TAGS.has(t)?"/":"")+">"}(t,d);o.push(p)}},characters:function(t){(t=(0,a.default)(t).call(t))&&(s(u,n)||o.push(t))},endElement:function(t){if(!s(t,n)){var e=function(t){return"</"+t+">"}(t);o.push(e),u=""}},comment:function(t){}});var f=o.join("");return f=function(t){var e=/<span>(.*?)<\/span>/;return t.replace(/<span>.*?<\/span>/gi,(function(t){var n=t.match(e);return null==n?"":n[1]}))}(f)}},function(t,e,n){"use strict";var o=n(0),r=o(n(109)),i=o(n(121));(0,o(n(1)).default)(e,"__esModule",{value:!0}),e.TOP_LEVEL_TAGS=e.EMPTY_TAGS=e.NECESSARY_ATTRS=e.IGNORE_TAGS=void 0,e.IGNORE_TAGS=new i.default(["doctype","!doctype","html","head","meta","body","script","style","link","frame","iframe","title","svg","center"]),e.NECESSARY_ATTRS=new r.default([["img",["src","alt"]],["a",["href","target"]],["td",["colspan","rowspan"]],["th",["colspan","rowspan"]]]),e.EMPTY_TAGS=new i.default(["area","base","basefont","br","col","hr","img","input","isindex","embed"]),e.TOP_LEVEL_TAGS=new i.default(["h1","h2","h3","h4","h5","p","ul","ol","table","blockquote","pre","hr","form"])},function(t,e,n){var o=n(284);t.exports=o},function(t,e,n){n(285),n(53),n(54),n(47);var o=n(11);t.exports=o.Set},function(t,e,n){"use strict";var o=n(110),r=n(112);t.exports=o("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r)},function(t,e){function n(){}n.prototype={handler:null,startTagRe:/^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m,endTagRe:/^<\/([^>\s]+)[^>]*>/m,attrRe:/([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm,parse:function(t,e){e&&(this.contentHandler=e);for(var n,o,r,i=!1,a=this;t.length>0;)"\x3c!--"==t.substring(0,4)?-1!=(r=t.indexOf("--\x3e"))?(this.contentHandler.comment(t.substring(4,r)),t=t.substring(r+3),i=!1):i=!0:"</"==t.substring(0,2)?this.endTagRe.test(t)?(RegExp.leftContext,n=RegExp.lastMatch,o=RegExp.rightContext,n.replace(this.endTagRe,(function(){return a.parseEndTag.apply(a,arguments)})),t=o,i=!1):i=!0:"<"==t.charAt(0)&&(this.startTagRe.test(t)?(RegExp.leftContext,n=RegExp.lastMatch,o=RegExp.rightContext,n.replace(this.startTagRe,(function(){return a.parseStartTag.apply(a,arguments)})),t=o,i=!1):i=!0),i&&(-1==(r=t.indexOf("<"))?(this.contentHandler.characters(t),t=""):(this.contentHandler.characters(t.substring(0,r)),t=t.substring(r))),i=!0},parseStartTag:function(t,e,n){var o=this.parseAttributes(e,n);this.contentHandler.startElement(e,o)},parseEndTag:function(t,e){this.contentHandler.endElement(e)},parseAttributes:function(t,e){var n=this,o=[];return e.replace(this.attrRe,(function(e,r,i,a,u,l,c){o.push(n.parseAttribute(t,e,r,i,a,u,l,c))})),o},parseAttribute:function(t,e,n){var o="";arguments[7]?o=arguments[8]:arguments[5]?o=arguments[6]:arguments[3]&&(o=arguments[4]);var r=!o&&!arguments[3];return{name:n,value:r?null:o}}},t.exports=n},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t,e){e.push((function(e){t.selection.createRangeByElem(e),t.selection.restoreSelection()}))}},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7),u=i(n(2));e.default=function t(e){var n=[],o=e.childNodes()||[];return(0,r.default)(o).call(o,(function(e){var o,r=e.nodeType;if(3===r&&(o=e.textContent||"",o=a.replaceHtmlSymbol(o)),1===r){(o=o={}).tag=e.nodeName.toLowerCase();for(var i=[],l=e.attributes||[],c=l.length||0,s=0;s<c;s++){var f=l[s];i.push({name:f.name,value:f.value})}o.attrs=i,o.children=t(u.default(e))}o&&n.push(o)})),n}},function(t,e,n){"use strict";var o=n(0),r=o(n(122)),i=o(n(118)),a=o(n(6)),u=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var l=u(n(295)),c=function(){function t(t){this.editor=t,this.menuList=[],this.constructorList=l.default}return t.prototype.extend=function(t,e){e&&"function"==typeof e&&(this.constructorList[t]=e)},t.prototype.init=function(){var t,e=this,n=this.editor.config;(0,a.default)(t=n.menus).call(t,(function(t){var n=e.constructorList[t];if(null!=n&&"function"==typeof n){var o=new n(e.editor);o.key=t,e.menuList.push(o)}})),this._addToToolbar()},t.prototype._addToToolbar=function(){var t,e=this.editor.$toolbarElem;(0,a.default)(t=this.menuList).call(t,(function(t){var n=t.$elem;n&&e.append(n)}))},t.prototype.menuFind=function(t){for(var e=this.menuList,n=0,o=e.length;n<o;n++)if(e[n].key===t)return e[n];return e[0]},t.prototype.changeActive=function(){var t;(0,a.default)(t=this.menuList).call(t,(function(t){var e;(0,i.default)((0,r.default)(e=t.tryChangeActive).call(e,t),100)}))},t}();e.default=c},function(t,e,n){var o=n(291);t.exports=o},function(t,e,n){var o=n(292),r=Function.prototype;t.exports=function(t){var e=t.bind;return t===r||t instanceof Function&&e===r.bind?o:e}},function(t,e,n){n(293);var o=n(17);t.exports=o("Function").bind},function(t,e,n){n(5)({target:"Function",proto:!0},{bind:n(294)})},function(t,e,n){"use strict";var o=n(32),r=n(13),i=[].slice,a={},u=function(t,e,n){if(!(e in a)){for(var o=[],r=0;r<e;r++)o[r]="a["+r+"]";a[e]=Function("C,a","return new C("+o.join(",")+")")}return a[e](t,n)};t.exports=Function.bind||function(t){var e=o(this),n=i.call(arguments,1),a=function(){var o=n.concat(i.call(arguments));return this instanceof a?u(e,o.length,o):e.apply(t,o)};return r(e.prototype)&&(a.prototype=e.prototype),a}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(296)),i=o(n(300)),a=o(n(301)),u=o(n(305)),l=o(n(306)),c=o(n(307)),s=o(n(308)),f=o(n(310)),d=o(n(312)),p=o(n(313)),A=o(n(314)),h=o(n(315)),v=o(n(316)),g=o(n(318)),m=o(n(338)),y=o(n(342)),w=o(n(344)),x=o(n(345)),b=o(n(347)),E=o(n(348)),_=o(n(349)),M=o(n(358)),C=o(n(362));e.default={bold:r.default,head:i.default,italic:u.default,link:a.default,underline:l.default,strikeThrough:c.default,fontName:s.default,fontSize:f.default,justify:d.default,quote:p.default,backColor:A.default,foreColor:h.default,video:v.default,image:g.default,indent:m.default,emoticon:y.default,list:w.default,lineHeight:x.default,undo:b.default,redo:E.default,table:_.default,code:M.default,splitLine:C.default}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(24)),f=c(n(2)),d=function(t){function e(e){var n=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-bold"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("bold"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},e.prototype.tryChangeActive=function(){this.editor.cmd.queryCommandState("bold")?this.active():this.unActive()},e}(s.default);e.default=d},function(t,e,n){var o=n(298);t.exports=o},function(t,e,n){n(299);var o=n(11);t.exports=o.Object.setPrototypeOf},function(t,e,n){n(5)({target:"Object",stat:!0},{setPrototypeOf:n(98)})},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(19)),f=c(n(2)),d=function(t){function e(e){var n=this,o=f.default('<div class="w-e-menu"><i class="w-e-icon-header"></i></div>'),r={width:100,title:"设置标题",type:"list",list:[{$elem:f.default("<h1>H1</h1>"),value:"<h1>"},{$elem:f.default("<h2>H2</h2>"),value:"<h2>"},{$elem:f.default("<h3>H3</h3>"),value:"<h3>"},{$elem:f.default("<h4>H4</h4>"),value:"<h4>"},{$elem:f.default("<h5>H5</h5>"),value:"<h5>"},{$elem:f.default("<p>"+e.i18next.t("menus.dropListMenu.head.正文")+"</p>"),value:"<p>"}],clickHandler:function(t){n.command(t)}};return n=t.call(this,o,e,r)||this}return l(e,t),e.prototype.command=function(t){var e=this.editor,n=e.selection.getSelectionContainerElem();n&&e.$textElem.equal(n)||e.cmd.do("formatBlock",t)},e.prototype.tryChangeActive=function(){var t=this.editor.cmd.queryCommandValue("formatBlock");/^h/i.test(t)?this.active():this.unActive()},e}(s.default);e.default=d},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(31)),f=c(n(2)),d=c(n(302)),p=c(n(124)),A=c(n(27)),h=c(n(303)),v=function(t){function e(e){var n,o=f.default('<div class="w-e-menu"><i class="w-e-icon-link"></i></div>');return n=t.call(this,o,e)||this,h.default(e),n}return l(e,t),e.prototype.clickHandler=function(){var t,e=this.editor;if(this.isActive){if(!(t=e.selection.getSelectionContainerElem()))return;this.createPanel(t.text(),t.attr("href"))}else e.selection.isSelectionEmpty()?this.createPanel("",""):this.createPanel(e.selection.getSelectionText(),"")},e.prototype.createPanel=function(t,e){var n=d.default(this.editor,t,e);new A.default(this,n).create()},e.prototype.tryChangeActive=function(){var t=this.editor;p.default(t)?this.active():this.unActive()},e}(s.default);e.default=v},function(t,e,n){"use strict";var o=n(0),r=o(n(23)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7),u=i(n(2)),l=i(n(124));e.default=function(t,e,n){var o,i=a.getRandom("input-link"),c=a.getRandom("input-text"),s=a.getRandom("btn-ok"),f=a.getRandom("btn-del"),d=l.default(t)?"inline-block":"none";function p(){if(l.default(t)){var e=t.selection.getSelectionContainerElem();e&&(t.selection.createRangeByElem(e),t.selection.restoreSelection(),o=e)}}return{width:300,height:0,tabs:[{title:t.i18next.t("menus.panelMenus.link.链接"),tpl:'<div>\n                        <input \n                            id="'+c+'" \n                            type="text" \n                            class="block" \n                            value="'+e+'" \n                            placeholder="'+t.i18next.t("menus.panelMenus.link.链接文字")+'"/>\n                        </td>\n                        <input \n                            id="'+i+'" \n                            type="text" \n                            class="block" \n                            value="'+n+'" \n                            placeholder="'+t.i18next.t("如")+' https://..."/>\n                        </td>\n                        <div class="w-e-button-container">\n                            <button id="'+s+'" class="right">\n                                '+t.i18next.t("插入")+'\n                            </button>\n                            <button id="'+f+'" class="gray right" style="display:'+d+'">\n                                '+t.i18next.t("menus.panelMenus.link.取消链接")+"\n                            </button>\n                        </div>\n                    </div>",events:[{selector:"#"+s,type:"click",fn:function(){var e,n,o=u.default("#"+i),a=u.default("#"+c),s=(0,r.default)(e=o.val()).call(e),f=(0,r.default)(n=a.val()).call(n);if(s&&(f||(f=s),function(e,n){var o=t.config.linkCheck(e,n);if(void 0===o);else{if(!0===o)return!0;alert(o)}return!1}(f,s)))return function(e,n){l.default(t)?(p(),t.cmd.do("insertHTML",'<a href="'+n+'" target="_blank">'+e+"</a>")):t.cmd.do("insertHTML",'<a href="'+n+'" target="_blank">'+e+"</a>")}(f,s),!0}},{selector:"#"+f,type:"click",fn:function(){return function(){if(l.default(t)){p();var e=o.text();t.cmd.do("insertHTML","<span>"+e+"</span>")}}(),!0}}]}]}}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(304));e.default=function(t){r.default(t)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r,i,a=o(n(2)),u=o(n(41));function l(t){var e=[{$elem:a.default("<span>"+i.i18next.t("menus.panelMenus.link.查看链接")+"</span>"),onClick:function(t,e){var n=e.attr("href");return window.open(n,"_target"),!0}},{$elem:a.default("<span>"+i.i18next.t("menus.panelMenus.link.取消链接")+"</span>"),onClick:function(t,e){t.selection.createRangeByElem(e),t.selection.restoreSelection();var n=e.text();return t.cmd.do("insertHTML","<span>"+n+"</span>"),!0}}];(r=new u.default(i,t,e)).create()}function c(){r&&(r.remove(),r=null)}e.default=function(t){i=t,t.txt.eventHooks.linkClickEvents.push(l),t.txt.eventHooks.clickEvents.push(c),t.txt.eventHooks.keyupEvents.push(c),t.txt.eventHooks.toolbarClickEvents.push(c),t.txt.eventHooks.menuClickEvents.push(c),t.txt.eventHooks.textScrollEvents.push(c)}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(24)),f=c(n(2)),d=function(t){function e(e){var n=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-italic"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("italic"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},e.prototype.tryChangeActive=function(){this.editor.cmd.queryCommandState("italic")?this.active():this.unActive()},e}(s.default);e.default=d},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(24)),f=c(n(2)),d=function(t){function e(e){var n=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-underline"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("underline"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},e.prototype.tryChangeActive=function(){this.editor.cmd.queryCommandState("underline")?this.active():this.unActive()},e}(s.default);e.default=d},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(24)),f=c(n(2)),d=function(t){function e(e){var n=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-strikethrough"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.isSelectionEmpty();e&&t.selection.createEmptyRange(),t.cmd.do("strikeThrough"),e&&(t.selection.collapseRange(),t.selection.restoreSelection())},e.prototype.tryChangeActive=function(){this.editor.cmd.queryCommandState("strikeThrough")?this.active():this.unActive()},e}(s.default);e.default=d},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(19)),f=c(n(2)),d=c(n(309)),p=function(t){function e(e){var n=this,o=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-font"></i>\n            </div>'),r={width:100,title:"设置字体",type:"list",list:new d.default(e.config.fontNames).getItemList(),clickHandler:function(t){n.command(t)}};return n=t.call(this,o,e,r)||this}return l(e,t),e.prototype.command=function(t){this.editor.cmd.do("fontName",t)},e.prototype.tryChangeActive=function(){},e}(s.default);e.default=p},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=i(n(2)),u=function(){function t(t){var e=this;this.itemList=[],(0,r.default)(t).call(t,(function(t){e.itemList.push({$elem:a.default("<p style=\"font-family:'"+t+"'\">"+t+"</p>"),value:t})}))}return t.prototype.getItemList=function(){return this.itemList},t}();e.default=u},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(19)),f=c(n(2)),d=c(n(311)),p=function(t){function e(e){var n=this,o=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-text-heigh"></i>\n            </div>'),r={width:160,title:"设置字号",type:"list",list:new d.default(e.config.fontSizes).getItemList(),clickHandler:function(t){n.command(t)}};return n=t.call(this,o,e,r)||this}return l(e,t),e.prototype.command=function(t){this.editor.cmd.do("fontSize",t)},e.prototype.tryChangeActive=function(){},e}(s.default);e.default=p},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2)),i=function(){function t(t){for(var e in this.itemList=[],t){var n=t[e];this.itemList.push({$elem:r.default('<p style="font-size:'+e+'">'+n.name+"</p>"),value:n.value})}}return t.prototype.getItemList=function(){return this.itemList},t}();e.default=i},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(19)),f=c(n(2)),d=function(t){function e(e){var n=this,o=f.default('<div class="w-e-menu"><i class="w-e-icon-paragraph-left"></i></div>'),r={width:100,title:"对齐方式",type:"list",list:[{$elem:f.default('<p>\n                            <i class="w-e-icon-paragraph-left w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.justify.靠左")+"\n                        </p>"),value:"justifyLeft"},{$elem:f.default('<p>\n                            <i class="w-e-icon-paragraph-center w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.justify.居中")+"\n                        </p>"),value:"justifyCenter"},{$elem:f.default('<p>\n                            <i class="w-e-icon-paragraph-right w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.justify.靠右")+"\n                        </p>"),value:"justifyRight"}],clickHandler:function(t){n.command(t)}};return n=t.call(this,o,e,r)||this}return l(e,t),e.prototype.command=function(t){var e=this.editor,n=e.selection.getSelectionContainerElem();n&&e.$textElem.equal(n)||e.cmd.do(t,t)},e.prototype.tryChangeActive=function(){},e}(s.default);e.default=d},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(2)),f=n(7),d=function(t){function e(e){var n=s.default('<div class="w-e-menu">\n                <i class="w-e-icon-quotes-left"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.isSelectionEmpty(),n=t.selection.getSelectionContainerElem(),o=n.getNodeName();if(e&&t.selection.createEmptyRange(),f.UA.isIE()){var r=void 0;if("P"===o)return r=n.text(),s.default("<blockquote>"+r+"</blockquote>").insertAfter(n),void n.remove();"BLOCKQUOTE"===o&&(r=n.text(),s.default("<p>"+r+"</p>").insertAfter(n),n.remove())}else"BLOCKQUOTE"===o?t.cmd.do("formatBlock","<p>"):t.cmd.do("formatBlock","<blockquote>");e&&(t.selection.collapseRange(),t.selection.restoreSelection())},e.prototype.tryChangeActive=function(){"blockquote"===this.editor.cmd.queryCommandValue("formatBlock")?this.active():this.unActive()},e}(c(n(24)).default);e.default=d},function(t,e,n){"use strict";var o,r=n(0),i=r(n(40)),a=r(n(1)),u=r(n(3)),l=r(n(4)),c=(o=function(t,e){return(o=l.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,u.default)(e):(n.prototype=e.prototype,new n)}),s=function(t){return t&&t.__esModule?t:{default:t}};(0,a.default)(e,"__esModule",{value:!0});var f=s(n(19)),d=s(n(2)),p=function(t){function e(e){var n,o=this,r=d.default('<div class="w-e-menu">\n                <i class="w-e-icon-paint-brush"></i>\n            </div>'),a={width:120,title:"背景颜色",type:"inline-block",list:(0,i.default)(n=e.config.colors).call(n,(function(t){return{$elem:d.default('<i style="color:'+t+';" class="w-e-icon-paint-brush"></i>'),value:t}})),clickHandler:function(t){o.command(t)}};return o=t.call(this,r,e,a)||this}return c(e,t),e.prototype.command=function(t){this.editor.cmd.do("backColor",t)},e.prototype.tryChangeActive=function(){},e}(f.default);e.default=p},function(t,e,n){"use strict";var o,r=n(0),i=r(n(40)),a=r(n(1)),u=r(n(3)),l=r(n(4)),c=(o=function(t,e){return(o=l.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,u.default)(e):(n.prototype=e.prototype,new n)}),s=function(t){return t&&t.__esModule?t:{default:t}};(0,a.default)(e,"__esModule",{value:!0});var f=s(n(19)),d=s(n(2)),p=function(t){function e(e){var n,o=this,r=d.default('<div class="w-e-menu">\n                <i class="w-e-icon-pencil2"></i>\n            </div>'),a={width:120,title:"文字颜色",type:"inline-block",list:(0,i.default)(n=e.config.colors).call(n,(function(t){return{$elem:d.default('<i style="color:'+t+';" class="w-e-icon-pencil2"></i>'),value:t}})),clickHandler:function(t){o.command(t)}};return o=t.call(this,r,e,a)||this}return c(e,t),e.prototype.command=function(t){this.editor.cmd.do("foreColor",t)},e.prototype.tryChangeActive=function(){},e}(f.default);e.default=p},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(2)),f=c(n(27)),d=c(n(31)),p=c(n(317)),A=function(t){function e(e){var n=s.default('<div class="w-e-menu">\n                <i class="w-e-icon-play"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){this.createPanel("")},e.prototype.createPanel=function(t){var e=p.default(this.editor,t);new f.default(this,e).create()},e.prototype.tryChangeActive=function(){},e}(d.default);e.default=A},function(t,e,n){"use strict";var o=n(0),r=o(n(23)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7),u=i(n(2));e.default=function(t,e){var n=a.getRandom("input-iframe"),o=a.getRandom("btn-ok");return{width:300,height:0,tabs:[{title:t.i18next.t("menus.panelMenus.video.插入视频"),tpl:'<div>\n                        <input \n                            id="'+n+'" \n                            type="text" \n                            class="block" \n                            placeholder="'+t.i18next.t("如")+'：<iframe src=... ></iframe>"/>\n                        </td>\n                        <div class="w-e-button-container">\n                            <button id="'+o+'" class="right">\n                                '+t.i18next.t("插入")+"\n                            </button>\n                        </div>\n                    </div>",events:[{selector:"#"+o,type:"click",fn:function(){var e,o=u.default("#"+n),i=(0,r.default)(e=o.val()).call(e);if(i)return function(e){t.cmd.do("insertHTML",e+"<p><br></p>")}(i),!0}}]}]}}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(31)),f=c(n(2)),d=c(n(319)),p=c(n(27)),A=c(n(326)),h=function(t){function e(e){var n,o=f.default('<div class="w-e-menu"><i class="w-e-icon-image"></i></div>');return n=t.call(this,o,e)||this,A.default(e),n}return l(e,t),e.prototype.clickHandler=function(){this.createPanel()},e.prototype.createPanel=function(){var t=d.default(this.editor);new p.default(this,t).create()},e.prototype.tryChangeActive=function(){},e}(s.default);e.default=h},function(t,e,n){"use strict";var o=n(0),r=o(n(23)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7),u=i(n(2)),l=i(n(87)),c=n(30);e.default=function(t){var e=t.config,n=new l.default(t),o=a.getRandom("up-trigger-id"),i=a.getRandom("up-file-id"),s=a.getRandom("input-link-url"),f=a.getRandom("btn-link"),d=function(e,n){return void 0===n&&(n="menus.panelMenus.image."),t.i18next.t(n+e)},p=1===e.uploadImgMaxLength?"":'multiple="multiple"',A=[{title:d("上传图片"),tpl:'<div class="w-e-up-img-container">\n                    <div id="'+o+'" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="'+i+'" type="file" '+p+' accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>\n                    </div>\n                </div>',events:[{selector:"#"+o,type:"click",fn:function(){var t=u.default("#"+i).elems[0];if(!t)return!0;t.click()}},{selector:"#"+i,type:"change",fn:function(){var t=u.default("#"+i).elems[0];if(!t)return!0;var e=t.files;return e.length&&n.uploadImg(e),!0}}]},{title:d("网络图片"),tpl:'<div>\n                    <input \n                        id="'+s+'" \n                        type="text" \n                        class="block"\n                        placeholder="'+d("图片链接")+'"/>\n                    </td>\n                    <div class="w-e-button-container">\n                        <button id="'+f+'" class="right">'+d("插入","")+"</button>\n                    </div>\n                </div>",events:[{selector:"#"+f,type:"click",fn:function(){var t,o=u.default("#"+s),i=(0,r.default)(t=o.val()).call(t);if(i&&function(t){var n=!0;c.imgRegex.test(t)||(n=!1);var o=e.linkImgCheck(t);if(void 0===o)!1===n&&console.log(d("您刚才插入的图片链接未通过编辑器校验","validate."));else if(!0===o){if(!1!==n)return!0;alert(d("您插入的网络图片无法识别","validate.")+"，"+d("请替换为支持的图片类型","validate.")+"：jpg | png | gif ...")}else alert(o);return!1}(i))return n.insertImg(i),!0}}]}],h={width:300,height:0,tabs:[]};return window.FileReader&&(e.uploadImgShowBase64||e.uploadImgServer||e.customUploadImg)&&h.tabs.push(A[0]),e.showLinkImg&&h.tabs.push(A[1]),h}},function(t,e,n){"use strict";var o=n(0),r=o(n(114)),i=o(n(6));(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7);e.default=function(t,e){var n=new XMLHttpRequest;if(n.open("POST",t),n.timeout=e.timeout||1e4,n.ontimeout=function(){console.error("wangEditor - 请求超时"),e.onTimeout&&e.onTimeout(n)},n.upload&&(n.upload.onprogress=function(t){var n=t.loaded/t.total;e.onProgress&&e.onProgress(n,t)}),e.headers&&(0,i.default)(a).call(a,e.headers,(function(t,e){n.setRequestHeader(t,e)})),n.withCredentials=!!e.withCredentials,e.beforeSend){var o=e.beforeSend(n);if(o&&"object"===(0,r.default)(o)&&o.prevent)return o.msg}return n.onreadystatechange=function(){if(4===n.readyState){var t=n.status;if(!(t<200||t>=300&&t<400)){if(t>=400)return console.error("wangEditor - XHR 报错，状态码 "+t),void(e.onError&&e.onError(n));var o,i=n.responseText;if("object"!==(0,r.default)(i))try{o=JSON.parse(i)}catch(t){return console.error("wangEditor - 返回结果不是 JSON 格式",i),void(e.onFail&&e.onFail(n,i))}else o=i;e.onSuccess(n,o)}}},n.send(e.formData||null),n}},function(t,e,n){"use strict";var o=n(0),r=o(n(322)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=i(n(2)),u=function(){function t(t){this.editor=t,this.$textContainer=t.$textContainerElem,this.$bar=a.default('<div class="w-e-progress"></div>'),this.isShow=!1,this.time=0,this.timeoutId=0}return t.prototype.show=function(t){var e=this;if(!this.isShow){this.isShow=!0;var n=this.$bar;this.$textContainer.append(n),(0,r.default)()-this.time>100&&t<=1&&(n.css("width",100*t+"%"),this.time=(0,r.default)());var o=this.timeoutId;o&&clearTimeout(o),this.timeoutId=window.setTimeout((function(){e.hide()}),500)}},t.prototype.hide=function(){this.$bar.remove(),this.isShow=!1,this.time=0,this.timeoutId=0},t}();e.default=u},function(t,e,n){t.exports=n(323)},function(t,e,n){var o=n(324);t.exports=o},function(t,e,n){n(325);var o=n(11);t.exports=o.Date.now},function(t,e,n){n(5)({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}})},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(327)),i=o(n(328)),a=o(n(329)),u=o(n(337));e.default=function(t){r.default(t),i.default(t),a.default(t),u.default(t)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=n(120),i=o(n(87));function a(t,e){if(!function(t,e){var n=t.config,o=n.pasteFilterStyle,i=n.pasteIgnoreImg,a=r.getPasteHtml(e,o,i),u=r.getPasteText(e);return!!a||!!u}(e,t)){var n=r.getPasteImgs(t);if(n.length)new i.default(e).uploadImg(n)}}e.default=function(t){t.txt.eventHooks.pasteEvents.push((function(e){a(e,t)}))}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r,i=o(n(87));function a(t){var e=t.dataTransfer&&t.dataTransfer.files;e&&e.length&&new i.default(r).uploadImg(e)}e.default=function(t){r=t,t.txt.eventHooks.dropEvents.push(a)}},function(t,e,n){"use strict";var o=n(0),r=o(n(330)),i=o(n(64)),a=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var u=a(n(2));n(335);var l,c=n(7),s=function(t,e,n,o,r){t.attr("style","\n      width:"+e+"px;\n      height:"+n+"px;\n      left:"+o+"px;\n      top:"+r+"px;\n    ")},f=function(t,e){var n=u.default('<div class="w-e-img-drag-mask">\n            <div class="w-e-img-drag-show-size"></div>\n            <div class="w-e-img-drag-rb"></div>\n         </div>');return function(t,e,n){e.on("click",(function(t){t.stopPropagation()})),e.on("mousedown",".w-e-img-drag-rb",(function(t){if(t.preventDefault(),l){var o=t.clientX,a=t.clientY,c=n.getBoundingClientRect(),f=l.getBoundingClientRect(),d=f.width,p=f.height,A=f.left-c.left,h=f.top-c.top,v=d/p,g=d,m=p,y=u.default(document);y.on("mousemove",x),y.on("mouseup",b),y.on("mouseleave",w)}function w(){y.off("mousemove",x),y.off("mouseup",b)}function x(t){t.stopPropagation(),t.preventDefault(),g=d+(t.clientX-o),m=p+(t.clientY-a),g/m!=v&&(m=g/v),g=(0,r.default)(g.toFixed(2)),m=(0,r.default)(m.toFixed(2)),(0,i.default)(e).call(e,".w-e-img-drag-show-size").text(g.toFixed(2).replace(".00","")+"px * "+m.toFixed(2).replace(".00","")+"px"),s(e,g,m,A,h)}function b(){l.attr("width",g+""),l.attr("height",m+"");var t=l.getBoundingClientRect();s(e,g,m,t.left-c.left,t.top-c.top),w()}}))}(0,n,e),n.hide(),e.append(n),n};e.default=function(t){var e=t.$textContainerElem,n=f(0,e);t.txt.eventHooks.imgClickEvents.push((function(t){if(c.UA.isIE())return!1;t&&(l=t,function(t,e){var n=t.getBoundingClientRect(),o=l.getBoundingClientRect(),a=o.width.toFixed(2),u=o.height.toFixed(2);(0,i.default)(e).call(e,".w-e-img-drag-show-size").text(a+"px * "+u+"px"),s(e,(0,r.default)(a),(0,r.default)(u),o.left-n.left,o.top-n.top),e.show()}(e,n))}));var o=function(){!function(t){(0,i.default)(t).call(t,".w-e-img-drag-mask").hide()}(e)};t.txt.eventHooks.textScrollEvents.push(o),t.txt.eventHooks.keyupEvents.push(o),t.txt.eventHooks.toolbarClickEvents.push(o),t.txt.eventHooks.menuClickEvents.push(o),document.onclick=o,t.txt.eventHooks.changeEvents.push(o)}},function(t,e,n){t.exports=n(331)},function(t,e,n){var o=n(332);t.exports=o},function(t,e,n){n(333);var o=n(11);t.exports=o.parseFloat},function(t,e,n){var o=n(5),r=n(334);o({global:!0,forced:parseFloat!=r},{parseFloat:r})},function(t,e,n){var o=n(8),r=n(84).trim,i=n(62),a=o.parseFloat,u=1/a(i+"-0")!=-1/0;t.exports=u?function(t){var e=r(String(t)),n=a(e);return 0===n&&"-"==e.charAt(0)?-0:n}:a},function(t,e,n){var o=n(21),r=n(336);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,".w-e-text-container {\n  overflow: hidden;\n}\n.w-e-img-drag-mask {\n  position: absolute;\n  z-index: 1;\n  border: 1px dashed #ccc;\n  box-sizing: border-box;\n}\n.w-e-img-drag-mask .w-e-img-drag-rb {\n  position: absolute;\n  right: -5px;\n  bottom: -5px;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #ccc;\n  cursor: se-resize;\n}\n.w-e-img-drag-mask .w-e-img-drag-show-size {\n  min-width: 110px;\n  height: 22px;\n  line-height: 22px;\n  font-size: 14px;\n  color: #999;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-color: #999;\n  color: #fff;\n  border-radius: 2px;\n  padding: 0 5px;\n}\n",""]),t.exports=e},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r,i,a=o(n(2)),u=o(n(41));function l(t){var e=[{$elem:a.default("<span class='w-e-icon-trash-o'></span>"),onClick:function(t,e){return t.selection.createRangeByElem(e),t.selection.restoreSelection(),t.cmd.do("delete"),!0}},{$elem:a.default("<span>30%</span>"),onClick:function(t,e){return e.attr("width","30%"),e.removeAttr("height"),!0}},{$elem:a.default("<span>50%</span>"),onClick:function(t,e){return e.attr("width","50%"),e.removeAttr("height"),!0}},{$elem:a.default("<span>100%</span>"),onClick:function(t,e){return e.attr("width","100%"),e.removeAttr("height"),!0}}];(r=new u.default(i,t,e)).create()}function c(){r&&(r.remove(),r=null)}e.default=function(t){i=t,t.txt.eventHooks.imgClickEvents.push(l),t.txt.eventHooks.clickEvents.push(c),t.txt.eventHooks.keyupEvents.push(c),t.txt.eventHooks.toolbarClickEvents.push(c),t.txt.eventHooks.menuClickEvents.push(c),t.txt.eventHooks.textScrollEvents.push(c),t.txt.eventHooks.imgDragBarMouseDownEvents.push(c),t.txt.eventHooks.changeEvents.push(c)}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(6)),a=r(n(1)),u=r(n(3)),l=r(n(4)),c=(o=function(t,e){return(o=l.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,u.default)(e):(n.prototype=e.prototype,new n)}),s=function(t){return t&&t.__esModule?t:{default:t}};(0,a.default)(e,"__esModule",{value:!0});var f=s(n(2)),d=s(n(19)),p=s(n(339)),A=function(t){function e(e){var n=this,o=f.default('<div class="w-e-menu">\n                <i class="w-e-icon-indent-increase"></i>\n            </div>'),r={width:130,title:"设置缩进",type:"list",list:[{$elem:f.default('<p>\n                            <i class="w-e-icon-indent-increase w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.indent.增加缩进")+"\n                        <p>"),value:"increase"},{$elem:f.default('<p>\n                            <i class="w-e-icon-indent-decrease w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.indent.减少缩进")+"\n                        <p>"),value:"decrease"}],clickHandler:function(t){n.command(t)}};return n=t.call(this,o,e,r)||this}return c(e,t),e.prototype.command=function(t){var e=this.editor,n=e.selection.getSelectionContainerElem();if(n&&e.$textElem.equal(n)){var o=e.selection.getSelectionRangeTopNodes(e);o.length>0&&(0,i.default)(o).call(o,(function(n){p.default(f.default(n),t,e)}))}else n&&n.length>0&&(0,i.default)(n).call(n,(function(n){p.default(f.default(n),t,e)}));e.selection.restoreSelection(),this.tryChangeActive()},e.prototype.tryChangeActive=function(){var t=this.editor,e=t.selection.getSelectionStartElem(),n=f.default(e).getNodeTop(t);n.length<=0||(""!=n.elems[0].style.paddingLeft?this.active():this.unActive())},e}(d.default);e.default=A},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(340)),i=o(n(341));e.default=function(t,e,n){var o=t.getNodeTop(n);/^P$/i.test(o.getNodeName())&&("increase"===e?r.default(o):"decrease"===e&&i.default(o))}},function(t,e,n){"use strict";var o=n(0),r=o(n(63));(0,o(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t){var e=t.elems[0];if(""===e.style.paddingLeft)t.css("padding-left","2em");else{var n=e.style.paddingLeft,o=(0,r.default)(n).call(n,0,n.length-2),i=Number(o)+2;t.css("padding-left",i+"em")}}},function(t,e,n){"use strict";var o=n(0),r=o(n(63));(0,o(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t){var e=t.elems[0];if(""!==e.style.paddingLeft){var n=e.style.paddingLeft,o=(0,r.default)(n).call(n,0,n.length-2),i=Number(o)-2;i>0?t.css("padding-left",i+"em"):t.css("padding-left","")}}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(2)),f=c(n(31)),d=c(n(27)),p=c(n(343)),A=function(t){function e(e){var n=s.default('<div class="w-e-menu">\n                <i class="w-e-icon-happy"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.createPanel=function(){var t=p.default(this.editor);new d.default(this,t).create()},e.prototype.clickHandler=function(){this.createPanel()},e.prototype.tryChangeActive=function(){},e}(f.default);e.default=A},function(t,e,n){"use strict";var o=n(0),r=o(n(23)),i=o(n(81)),a=o(n(40)),u=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var l=u(n(2));e.default=function(t){var e=t.config.emotions;function n(t){var e,n,o=[];"image"==t.type?(o=(0,a.default)(e=t.content).call(e,(function(t){return"string"==typeof t?"":'<span  title="'+t.alt+'">\n                    <img class="eleImg" style src="'+t.src+'" alt="['+t.alt+']">\n                </span>'})),o=(0,i.default)(o).call(o,(function(t){return""!==t}))):o=(0,a.default)(n=t.content).call(n,(function(t){return'<span class="eleImg" title="'+t+'">'+t+"</span>"}));return o.join("").replace(/&nbsp;/g,"")}return{width:300,height:230,tabs:(0,a.default)(e).call(e,(function(e){return{title:t.i18next.t("menus.panelMenus.emoticon."+e.title),tpl:"<div>"+n(e)+"</div>",events:[{selector:".eleImg",type:"click",fn:function(e){var n,o,i=l.default(e.target);"IMG"===i.getNodeName()?n=(0,r.default)(o=i.parent().html()).call(o):n="<span>"+i.html()+"</span>";return t.cmd.do("insertHTML",n),!0}}]}}))}}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(2)),f=function(t){function e(e){var n=this,o=s.default('<div class="w-e-menu">\n                <i class="w-e-icon-list2"></i>\n            </div>'),r={width:130,title:"序列",type:"list",list:[{$elem:s.default('\n                        <p>\n                            <i class="w-e-icon-list2 w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.list.无序列表")+"\n                        <p>"),value:"insertUnorderedList"},{$elem:s.default('<p>\n                            <i class="w-e-icon-list-numbered w-e-drop-list-item"></i>\n                            '+e.i18next.t("menus.dropListMenu.list.有序列表")+"\n                        <p>"),value:"insertOrderedList"}],clickHandler:function(t){n.command(t)}};return n=t.call(this,o,e,r)||this}return l(e,t),e.prototype.command=function(t){var e=this.editor,n=e.$textElem;if(e.selection.restoreSelection(),!e.cmd.queryCommandState(t)){var o=s.default(e.selection.getSelectionContainerElem()),r=s.default(o.elems[0]).parentUntil("TABLE",o.elems[0]);if(!(r&&"TABLE"===s.default(r.elems[0]).getNodeName()||(e.cmd.do(t),"LI"===o.getNodeName()&&(o=o.parent()),!1===/^ol|ul$/i.test(o.getNodeName())||o.equal(n)))){var i=o.parent();i.equal(n)||(o.insertAfter(i),i.remove(),e.selection.restoreSelection(),this.tryChangeActive())}}},e.prototype.tryChangeActive=function(){},e}(c(n(19)).default);e.default=f},function(t,e,n){"use strict";var o,r=n(0),i=r(n(50)),a=r(n(6)),u=r(n(1)),l=r(n(3)),c=r(n(4)),s=(o=function(t,e){return(o=c.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,l.default)(e):(n.prototype=e.prototype,new n)}),f=function(t){return t&&t.__esModule?t:{default:t}};(0,u.default)(e,"__esModule",{value:!0});var d=f(n(19)),p=f(n(2)),A=f(n(346)),h=n(7),v=function(t){function e(e){var n=this,o=p.default('<div class="w-e-menu">\n                    <i class="w-e-icon-row-height"></i>\n                </div>'),r={width:100,title:"设置行高",type:"list",list:new A.default(e,e.config.lineHeights).getItemList(),clickHandler:function(t){e.selection.saveRange(),n.command(t)}};return n=t.call(this,o,e,r)||this}return s(e,t),e.prototype.command=function(t){var e,n=this,o=window.getSelection?window.getSelection():document.getSelection(),r=["P"],u=this.editor,l="";u.selection.restoreSelection();var c=p.default(u.selection.getSelectionContainerElem()),s=p.default(u.selection.getSelectionContainerElem()),f=p.default(u.selection.getSelectionStartElem()).elems[0],d="",A=[],v="";if(c&&u.$textElem.equal(c)){if(h.UA.isIE())return;var g=[],m=[],y=[],w=p.default(u.selection.getSelectionStartElem()),x=p.default(u.selection.getSelectionEndElem()),b=null===(e=u.selection.getRange())||void 0===e?void 0:e.commonAncestorContainer.childNodes;m.push(this.getDom(w.elems[0])),null==b||(0,a.default)(b).call(b,(function(t,e){t===n.getDom(w.elems[0])&&g.push(e),t===n.getDom(x.elems[0])&&g.push(e)}));var E=0,_=void 0;for(y.push(this.getDom(w.elems[0]));m[E]!==this.getDom(x.elems[0]);)_=p.default(m[E].nextElementSibling).elems[0],-1!==(0,i.default)(r).call(r,p.default(_).getNodeName())?(y.push(_),m.push(_)):m.push(_),E++;if("P"!==p.default(m[0]).getNodeName()){E=0;for(var M=0;M<m.length;M++)if("P"===p.default(m[M]).getNodeName()){E=M;break}if(0===E)return;for(var C=0;C!==E;)m.shift(),C++}return this.setRange(m[0],m[m.length-1]),(0,a.default)(m).call(m,(function(e){d=e.getAttribute("style"),A=d?d.split(";"):[],v="","P"===p.default(e).getNodeName()?(v=t?n.styleProcessing(A)+"line-height:"+t+";":n.styleProcessing(A),l=l+"<"+p.default(e).getNodeName().toLowerCase()+' style="'+v+'">'+e.innerHTML+"</"+p.default(e).getNodeName().toLowerCase()+">"):(v=n.styleProcessing(A),l=l+"<"+p.default(e).getNodeName().toLowerCase()+' style="'+v+'">'+e.innerHTML+"</"+p.default(e).getNodeName().toLowerCase()+">")})),this.action(l,u),f=s.elems[0],void this.setRange(f.children[g[0]],f.children[g[1]])}f=this.getDom(f),-1!==(0,i.default)(r).call(r,p.default(f).getNodeName())&&(d=f.getAttribute("style"),A=d?d.split(";"):[],null==o||o.selectAllChildren(f),u.selection.saveRange(),t?(v=d?this.styleProcessing(A)+"line-height:"+t+";":"line-height:"+t+";",l="<"+p.default(f).getNodeName().toLowerCase()+' style="'+v+'">'+f.innerHTML+"</"+p.default(f).getNodeName().toLowerCase()+">","BLOCKQUOTE"===p.default(f).getNodeName()?p.default(f).css("line-height",t):this.action(l,u)):d&&(v=this.styleProcessing(A),l=""===v?"<"+p.default(f).getNodeName().toLowerCase()+">"+f.innerHTML+"</"+p.default(f).getNodeName().toLowerCase()+">":"<"+p.default(f).getNodeName().toLowerCase()+' style="'+v+'">'+f.innerHTML+"</"+p.default(f).getNodeName().toLowerCase()+">",this.action(l,u)))},e.prototype.getDom=function(t){var e=p.default(t).elems[0];if(!e.parentNode)return e;return e=function t(e,n){var o=p.default(e.parentNode);return n.$textElem.equal(o)?e:t(o.elems[0],n)}(e,this.editor)},e.prototype.action=function(t,e){e.cmd.do("insertHTML",t)},e.prototype.styleProcessing=function(t){var e="";return(0,a.default)(t).call(t,(function(t){""!==t&&-1===(0,i.default)(t).call(t,"line-height")&&(e=e+t+";")})),e},e.prototype.setRange=function(t,e){var n=this.editor,o=window.getSelection?window.getSelection():document.getSelection();null==o||o.removeAllRanges();var r=document.createRange(),i=t,a=e;r.setStart(i,0),r.setEnd(a,1),null==o||o.addRange(r),n.selection.saveRange(),null==o||o.removeAllRanges(),n.selection.restoreSelection()},e.prototype.tryChangeActive=function(){var t=this.editor,e=t.selection.getSelectionContainerElem();if(!e||!t.$textElem.equal(e)){var n=p.default(t.selection.getSelectionStartElem()),o=(n=this.getDom(n.elems[0])).getAttribute("style")?n.getAttribute("style"):"";o&&-1!==(0,i.default)(o).call(o,"line-height")?this.active():this.unActive()}},e}(d.default);e.default=v},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=i(n(2)),u=function(){function t(t,e){var n=this;this.itemList=[{$elem:a.default("<span>"+t.i18next.t("默认")+"</span>"),value:""}],(0,r.default)(e).call(e,(function(t){n.itemList.push({$elem:a.default("<span>"+t+"</span>"),value:t})}))}return t.prototype.getItemList=function(){return this.itemList},t}();e.default=u},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(2)),f=function(t){function e(e){var n=s.default('<div class="w-e-menu">\n                <i class="w-e-icon-undo"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){this.editor.history.revoke()},e.prototype.tryChangeActive=function(){this.editor.isCompatibleMode||(this.editor.history.size[0]?this.active():this.unActive())},e}(c(n(24)).default);e.default=f},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(2)),f=function(t){function e(e){var n=s.default('<div class="w-e-menu">\n                <i class="w-e-icon-redo"></i>\n            </div>');return t.call(this,n,e)||this}return l(e,t),e.prototype.clickHandler=function(){this.editor.history.restore()},e.prototype.tryChangeActive=function(){this.editor.isCompatibleMode||(this.editor.history.size[1]?this.active():this.unActive())},e}(c(n(24)).default);e.default=f},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(31)),f=c(n(2)),d=c(n(350)),p=c(n(27)),A=c(n(354)),h=function(t){function e(e){var n,o=f.default('<div class="w-e-menu"><i class="w-e-icon-table2"></i></div>');return n=t.call(this,o,e)||this,A.default(e),n}return l(e,t),e.prototype.clickHandler=function(){this.createPanel()},e.prototype.createPanel=function(){var t=d.default(this.editor);new p.default(this,t).create()},e.prototype.tryChangeActive=function(){},e}(s.default);e.default=h},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=n(7),i=o(n(2));n(351);var a=o(n(353));e.default=function(t){var e=new a.default(t),n=r.getRandom("w-col-id"),o=r.getRandom("w-row-id"),u=r.getRandom("btn-link"),l="menus.panelMenus.table.",c=function(e){return t.i18next.t(e)},s=[{title:c(l+"插入表格"),tpl:'<div>\n                    <div class="w-e-table">\n                        <span>'+c("创建")+'</span>\n                        <input id="'+o+'"  type="text" class="w-e-table-input" value="5"/></td>\n                        <span>'+c(l+"行")+'</span>\n                        <input id="'+n+'" type="text" class="w-e-table-input" value="5"/></td>\n                        <span>'+(c(l+"列")+c(l+"的")+c(l+"表格"))+'</span>\n                    </div>\n                    <div class="w-e-button-container">\n                        <button id="'+u+'" class="right">'+c("插入")+"</button>\n                    </div>\n                </div>",events:[{selector:"#"+u,type:"click",fn:function(){var t=Number(i.default("#"+n).val()),r=Number(i.default("#"+o).val());return t&&r&&e.createAction(r,t),!0}}]}],f={width:330,height:0,tabs:[]};return f.tabs.push(s[0]),f}},function(t,e,n){var o=n(21),r=n(352);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,".w-e-table {\n  display: flex;\n}\n.w-e-table .w-e-table-input {\n  width: 40px;\n  text-align: center!important;\n  margin: 0 5px;\n}\n",""]),t.exports=e},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2)),i=function(){function t(t){this.editor=t}return t.prototype.createAction=function(t,e){var n=this.editor,o=r.default(n.selection.getSelectionContainerElem()),i=r.default(o.elems[0]).parentUntil("UL",o.elems[0]),a=r.default(o.elems[0]).parentUntil("OL",o.elems[0]);if(!i&&!a){var u=this.createTableHtml(t,e);n.cmd.do("insertHTML",u)}},t.prototype.createTableHtml=function(t,e){for(var n="",o="",r=0;r<t;r++){o="";for(var i=0;i<e;i++)o+=0===r?"<th></th>":"<td></td>";n=n+"<tr>"+o+"</tr>"}return'<table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody>'+n+"</tbody></table><p><br></p>"},t}();e.default=i},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(355));e.default=function(t){r.default(t)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r,i,a=o(n(2)),u=o(n(41)),l=o(n(356)),c=o(n(357));function s(t){var e=new c.default(i),n=function(t,e){return void 0===e&&(e="menus.panelMenus.table."),i.i18next.t(e+t)},o=[{$elem:a.default("<span>"+n("删除表格")+"</span>"),onClick:function(t,e){return t.selection.createRangeByElem(e),t.selection.restoreSelection(),t.cmd.do("insertHTML","<p><br></p>"),!0}},{$elem:a.default("<span>"+n("添加行")+"</span>"),onClick:function(t,n){if(d(t))return!0;var o=a.default(t.selection.getSelectionStartElem()),r=e.getRowNode(o.elems[0]);if(!r)return!0;var i=Number(e.getCurrentRowIndex(n.elems[0],r)),u=e.getTableHtml(n.elems[0]),c=e.getTableHtml(l.default.ProcessingRow(a.default(u),i).elems[0]);return t.selection.createRangeByElem(n),t.selection.restoreSelection(),t.cmd.do("insertHTML",c),!0}},{$elem:a.default("<span>"+n("删除行")+"</span>"),onClick:function(t,n){if(d(t))return!0;var o=a.default(t.selection.getSelectionStartElem()),r=e.getRowNode(o.elems[0]);if(!r)return!0;var i=Number(e.getCurrentRowIndex(n.elems[0],r)),u=e.getTableHtml(n.elems[0]),c=l.default.DeleteRow(a.default(u),i).elems[0].childNodes[0].childNodes.length,s="";return t.selection.createRangeByElem(n),t.selection.restoreSelection(),s=0===c?"<p><br></p>":e.getTableHtml(l.default.DeleteRow(a.default(u),i).elems[0]),t.cmd.do("insertHTML",s),!0}},{$elem:a.default("<span>"+n("添加列")+"</span>"),onClick:function(t,n){if(d(t))return!0;var o=a.default(t.selection.getSelectionStartElem()),r=e.getCurrentColIndex(o.elems[0]),i=e.getTableHtml(n.elems[0]),u=e.getTableHtml(l.default.ProcessingCol(a.default(i),r).elems[0]);return t.selection.createRangeByElem(n),t.selection.restoreSelection(),t.cmd.do("insertHTML",u),!0}},{$elem:a.default("<span>"+n("删除列")+"</span>"),onClick:function(t,n){if(d(t))return!0;var o=a.default(t.selection.getSelectionStartElem()),r=e.getCurrentColIndex(o.elems[0]),i=e.getTableHtml(n.elems[0]),u=l.default.DeleteCol(a.default(i),r).elems[0].childNodes[0].childNodes[0].childNodes.length,c="";return t.selection.createRangeByElem(n),t.selection.restoreSelection(),c=1===u?"<p><br></p>":e.getTableHtml(l.default.DeleteCol(a.default(i),r).elems[0]),t.cmd.do("insertHTML",c),!0}},{$elem:a.default("<span>"+n("设置表头")+"</span>"),onClick:function(t,n){if(d(t))return!0;var o=a.default(t.selection.getSelectionStartElem()),r=e.getRowNode(o.elems[0]);if(!r)return!0;var i=Number(e.getCurrentRowIndex(n.elems[0],r));0!==i&&(i=0);var u=e.getTableHtml(n.elems[0]),c=e.getTableHtml(l.default.setTheHeader(a.default(u),i,"th").elems[0]);return t.selection.createRangeByElem(n),t.selection.restoreSelection(),t.cmd.do("insertHTML",c),!0}},{$elem:a.default("<span>"+n("取消表头")+"</span>"),onClick:function(t,n){var o=a.default(t.selection.getSelectionStartElem()),r=e.getRowNode(o.elems[0]);if(!r)return!0;var i=Number(e.getCurrentRowIndex(n.elems[0],r));0!==i&&(i=0);var u=e.getTableHtml(n.elems[0]),c=e.getTableHtml(l.default.setTheHeader(a.default(u),i,"td").elems[0]);return t.selection.createRangeByElem(n),t.selection.restoreSelection(),t.cmd.do("insertHTML",c),!0}}];(r=new u.default(i,t,o)).create()}function f(){r&&(r.remove(),r=null)}function d(t){var e=t.selection.getSelectionStartElem(),n=t.selection.getSelectionEndElem();return(null==e?void 0:e.elems[0])!==(null==n?void 0:n.elems[0])}e.default=function(t){i=t,t.txt.eventHooks.tableClickEvents.push(s),t.txt.eventHooks.clickEvents.push(f),t.txt.eventHooks.keyupEvents.push(f),t.txt.eventHooks.toolbarClickEvents.push(f),t.txt.eventHooks.menuClickEvents.push(f),t.txt.eventHooks.textScrollEvents.push(f)}},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=o(n(82)),a=o(n(63)),u=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var l=u(n(2));function c(t,e){for(;0!==t.childNodes.length;)t.removeChild(t.childNodes[0]);for(var n=0;n<e.length;n++)t.appendChild(e[n])}function s(t){var e=t.elems[0].childNodes[0];return"COLGROUP"===e.nodeName&&(e=t.elems[0].childNodes[t.elems[0].childNodes.length-1]),e}e.default={ProcessingRow:function(t,e){for(var n=s(t),o=(0,a.default)(Array.prototype).apply(n.childNodes),r=o[0].childNodes.length,u=document.createElement("tr"),f=0;f<r;f++){var d=document.createElement("td");u.appendChild(d)}return(0,i.default)(o).call(o,e+1,0,u),c(n,o),l.default(n.parentNode)},ProcessingCol:function(t,e){for(var n=s(t),o=(0,a.default)(Array.prototype).apply(n.childNodes),u=function(t){var n,a=[];for((0,r.default)(n=o[t].childNodes).call(n,(function(t){a.push(t)}));0!==o[t].childNodes.length;)o[t].removeChild(o[t].childNodes[0]);var u="TH"!==l.default(a[0]).getNodeName()?document.createElement("td"):document.createElement("th");(0,i.default)(a).call(a,e+1,0,u);for(var c=0;c<a.length;c++)o[t].appendChild(a[c])},f=0;f<o.length;f++)u(f);return c(n,o),l.default(n.parentNode)},DeleteRow:function(t,e){var n=s(t),o=(0,a.default)(Array.prototype).apply(n.childNodes);return(0,i.default)(o).call(o,e,1),c(n,o),l.default(n.parentNode)},DeleteCol:function(t,e){for(var n=s(t),o=(0,a.default)(Array.prototype).apply(n.childNodes),u=function(t){var n,a=[];for((0,r.default)(n=o[t].childNodes).call(n,(function(t){a.push(t)}));0!==o[t].childNodes.length;)o[t].removeChild(o[t].childNodes[0]);(0,i.default)(a).call(a,e,1);for(var u=0;u<a.length;u++)o[t].appendChild(a[u])},f=0;f<o.length;f++)u(f);return c(n,o),l.default(n.parentNode)},setTheHeader:function(t,e,n){for(var o=s(t),u=(0,a.default)(Array.prototype).apply(o.childNodes),f=u[e].childNodes,d=document.createElement("tr"),p=function(t){var e,o=document.createElement(n);(0,r.default)(e=f[t].childNodes).call(e,(function(t){o.appendChild(t)})),d.appendChild(o)},A=0;A<f.length;A++)p(A);return(0,i.default)(u).call(u,e,1,d),c(o,u),l.default(o.parentNode)}}},function(t,e,n){"use strict";var o=n(0),r=o(n(6)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=i(n(2)),u=function(){function t(t){this.editor=t}return t.prototype.getRowNode=function(t){var e,n=a.default(t).elems[0];return n.parentNode?n=null===(e=a.default(n).parentUntil("TR",n))||void 0===e?void 0:e.elems[0]:n},t.prototype.getCurrentRowIndex=function(t,e){var n,o=0,i=t.childNodes[0];return"COLGROUP"===i.nodeName&&(i=t.childNodes[t.childNodes.length-1]),(0,r.default)(n=i.childNodes).call(n,(function(t,n){t===e&&(o=n)})),o},t.prototype.getCurrentColIndex=function(t){var e,n,o=0,i="TD"===a.default(t).getNodeName()||"TH"===a.default(t).getNodeName()?t:null===(n=a.default(t).parentUntil("TD",t))||void 0===n?void 0:n.elems[0],u=a.default(i).parent();return(0,r.default)(e=u.elems[0].childNodes).call(e,(function(t,e){t===i&&(o=e)})),o},t.prototype.getTableHtml=function(t){return'<table border="0" width="100%" cellpadding="0" cellspacing="0">'+a.default(t).html()+"</table>"},t}();e.default=u},function(t,e,n){"use strict";var o,r=n(0),i=r(n(40)),a=r(n(1)),u=r(n(3)),l=r(n(4)),c=(o=function(t,e){return(o=l.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,u.default)(e):(n.prototype=e.prototype,new n)}),s=function(t){return t&&t.__esModule?t:{default:t}};(0,a.default)(e,"__esModule",{value:!0}),e.formatCodeHtml=void 0;var f=s(n(31)),d=s(n(2)),p=n(7),A=s(n(359)),h=s(n(125)),v=s(n(27)),g=s(n(360));e.formatCodeHtml=function(t,e){return e?(e=function(t){var e=t.match(/<pre[\s|\S]+?\/pre>/g);return null===e||(0,i.default)(e).call(e,(function(e){t=t.replace(e,e.replace(/<\/code><code>/g,"\n").replace(/<br>/g,""))})),t}(e=function t(e){var n,o=e.match(/<span\sclass="hljs[\s|\S]+?\/span>/gm);if(!o||!o.length)return e;for(var r=(0,i.default)(n=p.deepClone(o)).call(n,(function(t){return(t=t.replace(/<span\sclass="hljs[^>]+>/,"")).replace(/<\/span>/,"")})),a=0;a<o.length;a++)e=e.replace(o[a],r[a]);return t(e)}(e)),e=p.replaceSpecialSymbol(e)):e};var m=function(t){function e(e){var n,o=d.default('<div class="w-e-menu"><i class="w-e-icon-terminal"></i></div>');return n=t.call(this,o,e)||this,g.default(e),n}return c(e,t),e.prototype.insertLineCode=function(t){var e=this.editor,n=d.default("<code>"+t+"</code>");e.cmd.do("insertElem",n),e.selection.createRangeByElem(n,!1),e.selection.restoreSelection()},e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.getSelectionText();this.isActive||(t.selection.isSelectionEmpty()?this.createPanel("",""):this.insertLineCode(e))},e.prototype.createPanel=function(t,e){var n=A.default(this.editor,t,e);new v.default(this,n).create()},e.prototype.tryChangeActive=function(){var t=this.editor;h.default(t)?this.active():this.unActive()},e}(f.default);e.default=m},function(t,e,n){"use strict";var o=n(0),r=o(n(40)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7),u=i(n(2)),l=i(n(125));e.default=function(t,e,n){a.getRandom("code");var o,i=a.getRandom("input-iframe"),c=a.getRandom("select"),s=(a.getRandom("input-code"),a.getRandom("input-text"),a.getRandom("btn-ok"));function f(e){l.default(t)&&function(){if(!l.default(t))return;var e=t.selection.getSelectionStartElem(),n=null==e?void 0:e.getNodeTop(t);if(!n)return;t.selection.createRangeByElem(n),t.selection.restoreSelection(),n}(),t.cmd.do("insertHTML",e);var n=t.selection.getSelectionStartElem(),o=null==n?void 0:n.getNodeTop(t);u.default("<p><br></p>").insertAfter(o)}var d=function(e){return t.i18next.t(e)};return{width:500,height:0,tabs:[{title:d("menus.panelMenus.code.插入代码"),tpl:'<div>\n                        <select name="" id="'+c+'">\n                            '+(0,r.default)(o=t.config.languageType).call(o,(function(t){return"<option "+(n==t?"selected":"")+' value ="'+t+'">'+t+"</option>"}))+'\n                        </select>\n                        <textarea id="'+i+'" type="text" class="wang-code-textarea" placeholder="" style="height: 160px">'+e.replace(/&quot;/g,'"')+'</textarea>\n                        <div class="w-e-button-container">\n                            <button id="'+s+'" class="right">'+(l.default(t)?d("修改"):d("插入"))+"</button>\n                        </div>\n                    </div>",events:[{selector:"#"+s,type:"click",fn:function(){var e,n=document.getElementById(i),o=u.default("#"+c).val(),r=n.value;if(e=t.highlight?t.highlight.highlightAuto(r).value:"<xmp>"+r+"</xmp>",r)return!l.default(t)&&(f('<pre type="'+o+'"><code>'+e+"</code></pre>"),!0)}}]}]}}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(361));e.default=function(t){r.default(t)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r,i,a=o(n(2)),u=o(n(41));function l(t){var e,n,o=[{$elem:a.default("<span>"+(e="删除代码",void 0===n&&(n="menus.panelMenus.code."),i.i18next.t(n+e)+"</span>")),onClick:function(t,e){return e.remove(),!0}}];(r=new u.default(i,t,o)).create()}function c(){r&&(r.remove(),r=null)}e.default=function(t){i=t,t.txt.eventHooks.codeClickEvents.push(l),t.txt.eventHooks.clickEvents.push(c),t.txt.eventHooks.toolbarClickEvents.push(c),t.txt.eventHooks.menuClickEvents.push(c),t.txt.eventHooks.textScrollEvents.push(c)}},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(24)),f=c(n(2)),d=c(n(363)),p=function(t){function e(e){var n,o=f.default('<div class="w-e-menu"><i class="w-e-icon-split-line"></i></div>');return n=t.call(this,o,e)||this,d.default(e),n}return l(e,t),e.prototype.clickHandler=function(){var t=this.editor,e=t.selection.getRange(),n=t.selection.getSelectionContainerElem();if(n){var o=f.default(n.elems[0]),r=o.parentUntil("TABLE",n.elems[0]),i=o.children();"CODE"!==o.getNodeName()&&(r&&"TABLE"===f.default(r.elems[0]).getNodeName()||i&&0!==i.length&&"IMG"===f.default(i.elems[0]).getNodeName()&&!(null==e?void 0:e.collapsed)||this.createSplitLine())}},e.prototype.createSplitLine=function(){this.editor.cmd.do("insertHTML","<hr/>")},e.prototype.tryChangeActive=function(){},e}(s.default);e.default=p},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(364));e.default=function(t){r.default(t)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r,i,a=o(n(2)),u=o(n(41));function l(t){var e=[{$elem:a.default("<span>"+i.i18next.t("menus.panelMenus.删除")+"</span>"),onClick:function(t,e){return t.selection.createRangeByElem(e),t.selection.restoreSelection(),t.cmd.do("delete"),!0}}];(r=new u.default(i,t,e)).create()}function c(){r&&(r.remove(),r=null)}e.default=function(t){i=t,t.txt.eventHooks.splitLineEvents.push(l),t.txt.eventHooks.clickEvents.push(c),t.txt.eventHooks.keyupEvents.push(c),t.txt.eventHooks.toolbarClickEvents.push(c),t.txt.eventHooks.menuClickEvents.push(c),t.txt.eventHooks.textScrollEvents.push(c)}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2)),i=n(7),a="1px solid #c9d8db",u="#FFF",l="1px solid #EEE";e.default=function(t){var e,n,o,c,s=t.toolbarSelector,f=r.default(s),d=t.textSelector,p=t.config.height,A=t.i18next;null==d?(e=r.default("<div></div>"),n=r.default("<div></div>"),c=f.children(),f.append(e).append(n),e.css("background-color",u).css("border",a).css("border-bottom",l),n.css("border",a).css("border-top","none").css("height",p+"px")):(e=f,c=(n=r.default(d)).children()),(o=r.default("<div></div>")).attr("contenteditable","true").css("width","100%").css("height","100%");var h=r.default("<div>"+A.t(t.config.placeholder)+"</div>");h.addClass("placeholder"),c&&c.length?(o.append(c),h.hide()):o.append(r.default("<p><br></p>")),n.append(o),n.append(h),e.addClass("w-e-toolbar").css("z-index",t.zIndex.get("toolbar")),n.addClass("w-e-text-container"),n.css("z-index",t.zIndex.get()),o.addClass("w-e-text");var v=i.getRandom("toolbar-elem");e.attr("id",v);var g=i.getRandom("text-elem");o.attr("id",g);var m=n.getClientHeight();m!==o.getClientHeight()&&o.css("min-height",m+"px"),t.$toolbarElem=e,t.$textContainerElem=n,t.$textElem=o,t.toolbarElemId=v,t.textElemId=g}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2));e.default=function t(e,n){var o=e.$textElem,i=o.children();if(!i||!i.length)return o.append(r.default("<p><br></p>")),void t(e);var a=i.last();if(n){var u=a.html().toLowerCase(),l=a.getNodeName();if("<br>"!==u&&"<br/>"!==u||"P"!==l)return o.append(r.default("<p><br></p>")),void t(e)}e.config.focus&&(e.selection.createRangeByElem(a,!1,!0),e.selection.restoreSelection())}},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(2));e.default=function(t){!function(t){var e=t.config.onchange;t.txt.eventHooks.changeEvents.push((function(){var n=t.txt.html()||"";e(n),t.txt.togglePlaceholder()}))}(t),function(t){function e(e){var n=e.target,o=r.default(n),i=t.$textElem,a=t.$toolbarElem,u=i.isContain(o),l=a.isContain(o),c=a.elems[0]==e.target;if(u)t.isFocus||function(t){var e=t.config.onfocus,n=t.txt.html()||"";e(n)}(t),t.isFocus=!0;else{if(l&&!c)return;t.isFocus&&function(t){var e=t.config.onblur,n=t.txt.html()||"";e(n)}(t),t.isFocus=!1}}t.isFocus=!1,r.default(document).on("click",e),t.beforeDestroy((function(){r.default(document).off("click",e)}))}(t),function(t){t.$textElem.on("compositionstart",(function(){t.isComposing=!0})).on("compositionend",(function(){t.isComposing=!1}))}(t)}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0}),e.default=function(t){var e=t.config,n=e.lang,o=e.languages;if(null==t.i18next)t.i18next={t:function(t){var e=t.split(".");return e[e.length-1]}};else try{t.i18next.init({ns:"wangEditor",lng:n,defaultNS:"wangEditor",resources:o})}catch(t){throw new Error("i18next:"+t)}}},function(t,e,n){"use strict";var o=n(0),r=o(n(64)),i=function(t){return t&&t.__esModule?t:{default:t}};(0,o(n(1)).default)(e,"__esModule",{value:!0}),e.setUnFullScreen=e.setFullScreen=void 0;var a=i(n(2));n(370);e.setFullScreen=function(t){var e=a.default(t.toolbarSelector),n=t.$textContainerElem,o=t.$toolbarElem,i=(0,r.default)(o).call(o,"i.w-e-icon-fullscreen"),u=t.config;i.removeClass("w-e-icon-fullscreen"),i.addClass("w-e-icon-fullscreen_exit"),e.addClass("w-e-full-screen-editor"),e.css("z-index",u.zIndexFullScreen),n.css("height","100%")},e.setUnFullScreen=function(t){var e=a.default(t.toolbarSelector),n=t.$textContainerElem,o=t.$toolbarElem,i=(0,r.default)(o).call(o,"i.w-e-icon-fullscreen_exit"),u=t.config;i.removeClass("w-e-icon-fullscreen_exit"),i.addClass("w-e-icon-fullscreen"),e.removeClass("w-e-full-screen-editor"),e.css("z-index","auto"),n.css("height",u.height+"px")};e.default=function(t){if(!t.textSelector&&t.config.showFullScreen){var n=t.$toolbarElem,o=a.default('<div class="w-e-menu">\n            <i class="w-e-icon-fullscreen"></i>\n        </div>');o.on("click",(function(n){var o;(0,r.default)(o=a.default(n.currentTarget)).call(o,"i").hasClass("w-e-icon-fullscreen")?e.setFullScreen(t):e.setUnFullScreen(t)})),n.append(o)}}},function(t,e,n){var o=n(21),r=n(371);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var i={insert:"head",singleton:!1};o(r,i);t.exports=r.locals||{}},function(t,e,n){(e=n(22)(!1)).push([t.i,".w-e-full-screen-editor {\n  position: fixed;\n  width: 100%!important;\n  height: 100%!important;\n  left: 0;\n  top: 0;\n}\n",""]),t.exports=e},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(119)),i=function(){function t(){this.tier={menu:2,panel:2,toolbar:1,tooltip:1},this.baseZIndex=r.default.zIndex}return t.prototype.get=function(t){return t&&this.tier[t]?this.baseZIndex+this.tier[t]:this.baseZIndex},t.prototype.init=function(t){this.baseZIndex==r.default.zIndex&&(this.baseZIndex=t.config.zIndex)},t}();e.default=i},function(t,e,n){"use strict";var o,r=n(0),i=r(n(6)),a=r(n(81)),u=r(n(1)),l=r(n(3)),c=r(n(4)),s=(o=function(t,e){return(o=c.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,l.default)(e):(n.prototype=e.prototype,new n)}),f=function(t){return t&&t.__esModule?t:{default:t}};(0,u.default)(e,"__esModule",{value:!0});var d=f(n(374)),p=n(7),A=n(30),h=n(7);var v=function(t){function e(e){var n=t.call(this,(function(t,o){var r;if(t=function(t,e){return(0,a.default)(t).call(t,(function(t){var n=t.type,o=t.target,r=t.attributeName;return"attributes"!=n||"attributes"==n&&("contenteditable"==r||o!=e)}))}(t,o.target),(r=n.data).push.apply(r,t),e.isCompatibleMode)n.debounce();else if(n.data.length){if(h.UA.isFirefox)return n.save();if(!e.isComposing)return n.save()}}))||this;return n.editor=e,n.data=[],n.debounce=A.EMPTY_FN,n}return s(e,t),e.prototype.save=function(){this.editor.history.save(this.data),this.data.length=0,this.emit()},e.prototype.emit=function(){var t;(0,i.default)(t=this.editor.txt.eventHooks.changeEvents).call(t,(function(t){return t()}))},e.prototype.observe=function(){var e=this;if(t.prototype.observe.call(this,this.editor.$textElem.elems[0]),this.editor.isCompatibleMode){var n=this.editor.config.onchangeTimeout;this.debounce=p.debounce((function(){e.save()}),n)}},e}(d.default);e.default=v},function(t,e,n){"use strict";var o=n(0)(n(1));(0,o.default)(e,"__esModule",{value:!0});var r=function(){function t(t,e){var n=this;this.options={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0},this.callback=function(e){t(e,n)},this.observer=new MutationObserver(this.callback),e&&(this.options=e)}return(0,o.default)(t.prototype,"target",{get:function(){return this.node},enumerable:!1,configurable:!0}),t.prototype.observe=function(t){this.node instanceof Node||(this.node=t,this.connect())},t.prototype.connect=function(){if(this.node)return this.observer.observe(this.node,this.options),this;throw new Error("还未初始化绑定，请您先绑定有效的 Node 节点")},t.prototype.disconnect=function(){var t=this.observer.takeRecords();t.length&&this.callback(t),this.observer.disconnect()},t}();e.default=r},function(t,e,n){"use strict";var o=n(0)(n(1)),r=function(t){return t&&t.__esModule?t:{default:t}};(0,o.default)(e,"__esModule",{value:!0});var i=r(n(376)),a=r(n(388)),u=r(n(389)),l=function(){function t(t){this.editor=t,this.content=new i.default(t),this.scroll=new a.default(t),this.range=new u.default(t)}return(0,o.default)(t.prototype,"size",{get:function(){return this.scroll.size},enumerable:!1,configurable:!0}),t.prototype.observe=function(){this.content.observe(),this.scroll.observe(),!this.editor.isCompatibleMode&&this.range.observe()},t.prototype.save=function(t){t.length&&(this.content.save(t),this.scroll.save(),!this.editor.isCompatibleMode&&this.range.save())},t.prototype.revoke=function(){this.editor.change.disconnect();var t=this.content.revoke();t&&(this.scroll.revoke(),this.editor.isCompatibleMode||(this.range.revoke(),this.editor.$textElem.focus())),this.editor.change.connect(),t&&this.editor.change.emit()},t.prototype.restore=function(){this.editor.change.disconnect();var t=this.content.restore();t&&(this.scroll.restore(),this.editor.isCompatibleMode||(this.range.restore(),this.editor.$textElem.focus())),this.editor.change.connect(),t&&this.editor.change.emit()},t}();e.default=l},function(t,e,n){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}};(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var r=o(n(377)),i=o(n(386)),a=function(){function t(t){this.editor=t}return t.prototype.observe=function(){this.editor.isCompatibleMode?this.cache=new i.default(this.editor):this.cache=new r.default(this.editor),this.cache.observe()},t.prototype.save=function(t){this.editor.isCompatibleMode?this.cache.save():this.cache.compile(t)},t.prototype.revoke=function(){var t;return null===(t=this.cache)||void 0===t?void 0:t.revoke()},t.prototype.restore=function(){var t;return null===(t=this.cache)||void 0===t?void 0:t.restore()},t}();e.default=a},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(88)),f=c(n(379)),d=n(380),p=function(t){function e(e){var n=t.call(this,e.config.historyMaxSize)||this;return n.editor=e,n}return l(e,t),e.prototype.observe=function(){this.resetMaxSize(this.editor.config.historyMaxSize)},e.prototype.compile=function(t){return this.save(f.default(t)),this},e.prototype.revoke=function(){return t.prototype.revoke.call(this,(function(t){d.revoke(t)}))},e.prototype.restore=function(){return t.prototype.restore.call(this,(function(t){d.restore(t)}))},e}(s.default);e.default=p},function(t,e,n){"use strict";var o=n(0)(n(1));(0,o.default)(e,"__esModule",{value:!0}),e.CeilStack=void 0;var r=function(){function t(t){void 0===t&&(t=0),this.data=[],this.max=0,this.reset=!1,(t=Math.abs(t))&&(this.max=t)}return t.prototype.resetMax=function(t){t=Math.abs(t),this.reset||isNaN(t)||(this.max=t,this.reset=!0)},(0,o.default)(t.prototype,"size",{get:function(){return this.data.length},enumerable:!1,configurable:!0}),t.prototype.instack=function(t){return this.data.unshift(t),this.max&&this.size>this.max&&(this.data.length=this.max),this},t.prototype.outstack=function(){return this.data.shift()},t.prototype.clear=function(){return this.data.length=0,this},t}();e.CeilStack=r},function(t,e,n){"use strict";var o=n(0),r=o(n(50)),i=o(n(6));(0,o(n(1)).default)(e,"__esModule",{value:!0});var a=n(7);function u(t){switch(t){case"childList":return"node";case"attributes":return"attr";default:return"text"}}function l(t){switch(t.type){case"attributes":return t.target.getAttribute(t.attributeName)||"";case"characterData":return t.target.textContent;default:return""}}function c(t){var e={};return t.addedNodes.length&&(e.add=a.toArray(t.addedNodes)),t.removedNodes.length&&(e.remove=a.toArray(t.removedNodes)),e}function s(t){return t.previousSibling?{type:"before",target:t.previousSibling}:t.nextSibling?{type:"after",target:t.nextSibling}:{type:"parent",target:t.target}}var f=["UL","OL","H1","H2","H3","H4","H5","H6"];function d(t,e){for(var n=0,o=e.length-1;o>0&&t.contains(e[o]);o--)n++;return n}e.default=function(t){var e=[],n=!1,o=[];return(0,i.default)(t).call(t,(function(t,i){var p={type:u(t.type),target:t.target,attr:t.attributeName||"",value:l(t)||"",oldValue:t.oldValue||"",nodes:c(t),position:s(t)};if(e.push(p),a.UA.isFirefox){if(n&&t.addedNodes.length&&1==t.addedNodes[0].nodeType){var A=t.addedNodes[0],h={type:"node",target:A,attr:"",value:"",oldValue:"",nodes:{add:[n]},position:{type:"parent",target:A}};-1!=(0,r.default)(f).call(f,A.nodeName)?(h.nodes.add=a.toArray(A.childNodes),e.push(h)):3==n.nodeType?(d(A,o)&&(h.nodes.add=a.toArray(A.childNodes)),e.push(h)):-1==(0,r.default)(f).call(f,t.target.nodeName)&&d(A,o)&&(h.nodes.add=a.toArray(A.childNodes),e.push(h))}"node"==p.type&&1==t.removedNodes.length?(n=t.removedNodes[0],o.push(n)):(n=!1,o.length=0)}})),e}},function(t,e,n){"use strict";var o=n(0),r=o(n(381)),i=o(n(6));function a(t,e){var n=t.position.target;switch(t.position.type){case"before":n.nextSibling?(n=n.nextSibling,(0,i.default)(e).call(e,(function(e){t.target.insertBefore(e,n)}))):(0,i.default)(e).call(e,(function(e){t.target.appendChild(e)}));break;case"after":(0,i.default)(e).call(e,(function(e){t.target.insertBefore(e,n)}));break;default:(0,i.default)(e).call(e,(function(t){n.appendChild(t)}))}}(0,o(n(1)).default)(e,"__esModule",{value:!0}),e.restore=e.revoke=void 0;var u={node:function(t){for(var e=0,n=(0,r.default)(t.nodes);e<n.length;e++){var o=n[e],u=o[0],l=o[1];switch(u){case"add":(0,i.default)(l).call(l,(function(e){t.target.removeChild(e)}));break;default:a(t,l)}}},text:function(t){t.target.textContent=t.oldValue},attr:function(t){var e=t.target;null==t.oldValue?e.removeAttribute(t.attr):e.setAttribute(t.attr,t.oldValue)}};e.revoke=function(t){for(var e=t.length-1;e>-1;e--){var n=t[e];u[n.type](n)}};var l={node:function(t){for(var e=0,n=(0,r.default)(t.nodes);e<n.length;e++){var o=n[e],u=o[0],l=o[1];switch(u){case"add":a(t,l);break;default:(0,i.default)(l).call(l,(function(t){t.parentNode.removeChild(t)}))}}},text:function(t){t.target.textContent=t.value},attr:function(t){t.target.setAttribute(t.attr,t.value)}};e.restore=function(t){for(var e=0,n=t;e<n.length;e++){var o=n[e];l[o.type](o)}}},function(t,e,n){t.exports=n(382)},function(t,e,n){var o=n(383);t.exports=o},function(t,e,n){n(384);var o=n(11);t.exports=o.Object.entries},function(t,e,n){var o=n(5),r=n(385).entries;o({target:"Object",stat:!0},{entries:function(t){return r(t)}})},function(t,e,n){var o=n(14),r=n(59),i=n(25),a=n(51).f,u=function(t){return function(e){for(var n,u=i(e),l=r(u),c=l.length,s=0,f=[];c>s;)n=l[s++],o&&!a.call(u,n)||f.push(t?[n,u[n]]:u[n]);return f}};t.exports={entries:u(!0),values:u(!1)}},function(t,e,n){"use strict";(0,n(0)(n(1)).default)(e,"__esModule",{value:!0});var o=n(387),r=function(){function t(t){this.editor=t,this.data=new o.TailChain}return t.prototype.observe=function(){this.data.resetMax(this.editor.config.historyMaxSize),this.data.insertLast(this.editor.$textElem.html())},t.prototype.save=function(){return this.data.insertLast(this.editor.$textElem.html()),this},t.prototype.revoke=function(){var t=this.data.prev();return!!t&&(this.editor.$textElem.html(t),!0)},t.prototype.restore=function(){var t=this.data.next();return!!t&&(this.editor.$textElem.html(t),!0)},t}();e.default=r},function(t,e,n){"use strict";var o=n(0),r=o(n(82)),i=o(n(1));(0,i.default)(e,"__esModule",{value:!0}),e.TailChain=void 0;var a=function(){function t(){this.data=[],this.max=0,this.point=0,this.isRe=!1}return t.prototype.resetMax=function(t){(t=Math.abs(t))&&(this.max=t)},(0,i.default)(t.prototype,"size",{get:function(){return this.data.length},enumerable:!1,configurable:!0}),t.prototype.insertLast=function(t){var e;this.isRe&&((0,r.default)(e=this.data).call(e,this.point+1),this.isRe=!1);for(this.data.push(t);this.max&&this.size>this.max;)this.data.shift();return this.point=this.size-1,this},t.prototype.current=function(){return this.data[this.point]},t.prototype.prev=function(){if(!this.isRe&&(this.isRe=!0),this.point--,!(this.point<0))return this.current();this.point=0},t.prototype.next=function(){if(!this.isRe&&(this.isRe=!0),this.point++,!(this.point>=this.size))return this.current();this.point=this.size-1},t}();e.TailChain=a},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=function(t){function e(e){var n=t.call(this,e.config.historyMaxSize)||this;return n.editor=e,n.last=0,n.target=e.$textElem.elems[0],n}return l(e,t),e.prototype.observe=function(){var t=this;this.target=this.editor.$textElem.elems[0],this.editor.$textElem.on("scroll",(function(){t.last=t.target.scrollTop})),this.resetMaxSize(this.editor.config.historyMaxSize)},e.prototype.save=function(){return t.prototype.save.call(this,[this.last,this.target.scrollTop]),this},e.prototype.revoke=function(){var e=this;return t.prototype.revoke.call(this,(function(t){e.target.scrollTop=t[0]}))},e.prototype.restore=function(){var e=this;return t.prototype.restore.call(this,(function(t){e.target.scrollTop=t[1]}))},e}(c(n(88)).default);e.default=s},function(t,e,n){"use strict";var o,r=n(0),i=r(n(1)),a=r(n(3)),u=r(n(4)),l=(o=function(t,e){return(o=u.default||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?(0,a.default)(e):(n.prototype=e.prototype,new n)}),c=function(t){return t&&t.__esModule?t:{default:t}};(0,i.default)(e,"__esModule",{value:!0});var s=c(n(88)),f=c(n(2));function d(t){return{start:[t.startContainer,t.startOffset],end:[t.endContainer,t.endOffset],root:t.commonAncestorContainer,collapsed:t.collapsed}}var p=function(t){function e(e){var n=t.call(this,e.config.historyMaxSize)||this;return n.editor=e,n.lastRange=d(document.createRange()),n.root=e.$textElem.elems[0],n}return l(e,t),(0,i.default)(e.prototype,"rangeHandle",{get:function(){var t=document.getSelection();return t&&t.rangeCount?t.getRangeAt(0):document.createRange()},enumerable:!1,configurable:!0}),e.prototype.observe=function(){var t=this;function e(){var e=t.rangeHandle;(t.root===e.commonAncestorContainer||t.root.contains(e.commonAncestorContainer))&&(t.editor.isComposing||(t.lastRange=d(e)))}this.root=this.editor.$textElem.elems[0],this.resetMaxSize(this.editor.config.historyMaxSize),f.default(document).on("selectionchange",e),t.editor.$textElem.on("keydown",(function(e){"Backspace"!=e.key&&"Delete"!=e.key||(t.lastRange=d(t.rangeHandle))})),this.editor.beforeDestroy((function(){f.default(document).off("selectionchange",e)}))},e.prototype.save=function(){var e=d(this.rangeHandle);return t.prototype.save.call(this,[this.lastRange,e]),this.lastRange=e,this},e.prototype.set=function(t){if(t){var e=this.rangeHandle;return e.setStart.apply(e,t.start),e.setEnd.apply(e,t.end),this.editor.menus.changeActive(),!0}return!1},e.prototype.revoke=function(){var e=this;return t.prototype.revoke.call(this,(function(t){e.set(t[0])}))},e.prototype.restore=function(){var e=this;return t.prototype.restore.call(this,(function(t){e.set(t[1])}))},e}(s.default);e.default=p}]).default}));

/***/ }),

/***/ "f8cd":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ })

}]);
//# sourceMappingURL=myPlugin.umd.vendors~plugin.js.map