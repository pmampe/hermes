/*
 * Copyright (c) 2013, IT Services, Stockholm University
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Stockholm University nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

if (!("JST" in window) || "JST" === undefined) {
  window.JST = {};
}

JST['map/icons/default'] = new google.maps.MarkerImage(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ' +
        'lYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6' +
        'cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlI' +
        'DUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi' +
        '8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM' +
        '6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hh' +
        'cC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9ya' +
        'WdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNjE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgeG1wTU06RG9jdW1lbnRJRD' +
        '0ieG1wLmRpZDpEQjlEOTJCOUMzODAxMUUyQkZCRDlBNDI1MkU1NDFFNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjlEOTJ' +
        'COEMzODAxMUUyQkZCRDlBNDI1MkU1NDFFNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8' +
        'eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzN' +
        'yIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNjE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIvPiA8L3JkZjpEZXNjcm' +
        'lwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pln4y90AAAU1SURBVHjatFddTBxVFL7zs+w' +
        'Puyu/hbChUkvBiqhY1IjS+CBpE0rUNNYYfANj+sCTJvqCL7xook88VCOPEmNrow3GaOiDwYZYSwstUkRbRXApYJdlf2Z3Z2ZnxnPu' +
        'HXB2dlmWrZ7kg9m5537nu+ee+zOcYRhkD1YHqAVwO7Qj2SpgpVBCrgABfsAhUpz9Bojei4DH84y2UMMA1/YqoATQSv5bmwUohQjYB' +
        '6jPxZCa/nRf8vKZ57TQ7WcNTSk3VKmZkjhKFzihJCxUHrzkfur0966219Z3ELEMWM8nwAVoyQo8e65S+vbtN7Ro8EViGHz+quJ0wR' +
        '/4qvT4+x+7Wl8O5fCYQ8qdBByxe0c/7+1I/Xz+PWLoHqrQ30BKfPVEdHiJ6CynPmk5TNJqnCixZZKKLprMfML18Ml3/K+MTuYQcTW' +
        'XgMcAgtUrfKbjVTU49SY+O/37SWllCwQuJUTXoLR0s74Iq1MOEsMLIEQiUmiOyNEl2uIItH9YfnryM5sAICAzVgFZSy0yevKo/MvX' +
        'H2DKS6tbSWl5I3RTAWkQkGYirAIgOOFFGALCQaTwLSL9PUunxPngibfu6z0/kWuJbgk4Yi+26Jevn4UgXnfZAeKregjzzKApDNtZI' +
        'NujJ0IJg+ikiN29SZKbf2Bb3P/SJ6dyFOdVLKisopIuvtuPwV3+APFVNsHigb0E5pmkNkyE2W8rUpZ2/A19sC9yIBflzDaeN7fXbU' +
        'teGanVIlDtYJ6y/YSoEFzZtCDC3qkxyEicAZ+pXyTTF95RDpx04ERu+9aOAmoyBFz+6Djklnf5aonIQZpVJDKDahBMR0jgkoD/Jui' +
        'zxNrQhwqM0L7IgVzIybgzrCYr/fLG0jN0uXnLYHTmKDXJDJYEHpltaAZuaioDfVZYG/qgL/ahGYoxLuQOLz9tjyfaX2hK4gFci6IA' +
        'xZk2iWhgCMSZlc8ZO2z52Kaz4tQBGvzWOCKKbsYtS427ChCJ6mULS2EjoZsWPPNY9YZl6e107nCmQPNZ5+GvkMGdVwD04+j5Z5iBM' +
        'cUFBbeKIGa2VHNqUv9y7yYgoYuyV1Ddhi7DHmIGJ4UGt4nAvsCBXFvcWevQ/iKsuGN0f1fBl0szEgHmE2tiT9BNAWnGBRZS3NFdBf' +
        'yeqviL7oZJxSQx2AlRDHgmhHKBLaYqgrkErFlfzMiHpmGqjJSkkrRGig9uAjmQCzmR2xZ/jbdfILWq1uszkWp6piZixaQ+E5QDBwa' +
        'cyG0TsIICdOub7u7um+fuNM2rOp9OSUAQ54oePfZFDuRCTuS2CdB5y9FIrbOzc9NR3fzjaPDwFfwd3+BJIsqzydoDsA/2RUMu5ERu' +
        '23G8XYRR6zrr6+v74VK4fumbtQM3qIgQT6LrAtG03bOBPuiLfdCQA7mQ07ZOo/Z94NrWvaC9vT3W1dV14YvvdMe64pF6A/NPkJgup' +
        'mICHK8GKfHqRMRj38U0p1McSUOhK3EermRsr8G048gnQoE7x451XUBOW6zdL6WDg4NPTk9PP1/rTLhPBRYOP+q/ez9HDC7/FsQZ16' +
        'NVf54NNs+vyp5kW1vbxaGhoZ8KvZRmXcuHh4ebxsfHX9B13YFCOipW6lp8oVqPoDprnAl6zK3Jns2E5pDnYpWrkxt1KxiY53kVszg' +
        'wMPDrXq7lOTMxNTXlGxkZORoMBh8Bfy7/rZwzAoHAjf7+/glb2jNGXtSnGQoZGxtrXlxcbJRl2ROPx+kNx+v1rjqdzkRDQ8Otnp6e' +
        'BVvgoj7NrIZpPljk59htwOa9fh3/r5/n/wgwADhW9BIv1DLQAAAAAElFTkSuQmCC',
    new google.maps.Size(32, 32),
    new google.maps.Point(0, 0),
    new google.maps.Point(16, 16)
);

JST['map/icons/parking'] = new google.maps.MarkerImage(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAwCAYAAACWhbMrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl' +
        'YWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cm' +
        'VTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUu' +
        'MC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3' +
        'd3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1w' +
        'TU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLj' +
        'Avc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFs' +
        'RG9jdW1lbnRJRD0ieG1wLmRpZDozQTE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLm' +
        'RpZDpBRkQ4Nzg5QkMzQTgxMUUyODVFMUNDRUUzQkI5NzU1OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRkQ4Nzg5QUMzQTgx' +
        'MUUyODVFMUNDRUUzQkI5NzU1OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RG' +
        'VyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2QTFBRTFCMUEzQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgc3RSZWY6' +
        'ZG9jdW1lbnRJRD0ieG1wLmRpZDozQTE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC' +
        '9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhgcSfYAAAXoSURBVHjazJhbaFxFGMdnztmTFEkTiVmMoIHW' +
        'aotPpZVitaWX0NIi2NQnaV8E+2ClYo23gg9qEe2FaqUBfSkothH6Yi2G1oTEQuuqqWLwkmwwGJOaC00obtwkezs7ft/MnDlz9prs2S' +
        'Qd8mVm95wz89v/982c+YaS+zeSEgo+9CTYI2ANYEFZD4NNyLoXrA3s+0IdsZuhrO/oPKBw0CNge+GxercHmmMkpn8Yh39fgh2TsEWh' +
        'jDnA1ICdgtHDYAcJNerB4EkTLABfBURtWBmf4Treh/fjc4T+Kfrh/RUsxZTaBbecBzVq8VY5iDD1OY9SLI0NUTvGP7MI/HsGPlzJp1' +
        'SgAO8hGPA01Cb+EcPgTQFiZgBmQmkgzHbrNILZoBT7GuAOQ92Sa+Q8UPQUDNasABxXcfeYrmu4WlTULpGMKalS2pZAKbhN1syGDtJn' +
        '4PoKuPGVOUDRNwWQBmJaGpSjjuY63YVOkPMaoAypGMKg2YbbJqSZPvBEhN387miBmKK7AOayUMaSMJZXJUo1ldxuPEqpyokp5qrFLQ' +
        'lwSVELJXcD2JUcUBDM1AwDUFDAVABURQ6gTHcVK9KdCsyWUAmoExLOvg3XHgKw29qSwH/9uwrIrATHVgooBabNunkVqSw+74QC9sn7' +
        'r5TeMGv5+K5Sj+NDDaDEX3CzqR5Q644pOQTM2webyFvPNxVF6ekfJj3hYfLOJxfJ36OTmmpEcyWolIoL1eyEDd+vZMPXhg0ZI80AYK' +
        'pf4QGiJahDyNrVDeTZPZvILxeO8rarGiXuJJLjiYlkcg45hXAd2ucGdSaQv3L38rvIt2eP8NrzatLBnEkFHLRhsxmAxha4GFQBrV4P' +
        'cxv05ZOt3E1KoTUNZM+2dWTro2s8YKja6XPtnlDjmuB4LCBcathBmK1bDAjA7VmL4zxchkBXfworw4G3PXeMt/WCoNkTQFdMCmIYOy' +
        'CmzPVeIKOkGMosH51vn/vMpB5R1iLUKu+7jJSluMFdnMsdGznMVei+oBtHtCwqNW1fR17avzPLzfnVctYy7r4gBnqVepeVAPTh6/vI' +
        'v//NqM96gOvls0vXi8il1KoBKDoLrSpBuzBuwuDHxbSwC6mj2ixGVxQaVfIKKWdBBXFF9ywF+akkmBFBpQb5nrtEnk+/uk6Gxiazvr' +
        '96I8zV0V1blEuADQZk1rGxVDUwVjLXJJ+lH6O7i9xZpcOAfQ5C2XcIkI08Bs/LGOtQ++olKWoj2MH6L44bMvVp0XeyS8EkGy3iNS1S' +
        'oTawnqVVKt3Dei+0iWzGzc1ehH/XBBgtuATgdNd3mP5lYnJ8Z3VYsQPQlgkzK87AMn+oHJu7uTPxhOJj9tu5F9yzBCaTRWGQGKZ/Xj' +
        'w38tywB8Y97D3g0BPFNOzgGdsN9w4sEtMAjLeT/f5FIgNKyywE3ASAboabuxfYbd04DrhtIvsoyMn3bQ2M2ePQ2AqN1gUiauX983FI' +
        'jvMplblqWatIp2cBeD9cPwD3RcpEE+H9Yb/YP46TE0rl+9KNtgMn83ySPgsdrYTGB2DREmGi/HneD/Snp+75D80yMguVrqt8zNkuw5' +
        'cU1hDylDhm5Ged+QrGyiVxtMhfYwn1453DDZxXA5cLneTlyl4t9yxBTy7UiQut2XTfTPuDD6/eEGcWmRgZJD/0jT89XXEvvORZxHvy' +
        'onsjocDYYGehQzOZ5+OGIc20lZZhkqglqhKOcbBIjTU7UluRINU1y0h8NDp5z0zvj9NWXQaQc9qiHQU5kyrXSV6uM8f5lFdfe+Ob9R' +
        'se21tfX09iM7Hu8bGR0aHQ5776NPxOJ0rpkGHgOQl3/6+hUMj3FPUNlUwmB1OpFEGzbbu/HOuGHyieelhW4J94PGbHYjEAS/aVnECW' +
        'AcrJx4yTJ44notHorelo1LYCZp92rWSwgE+lOBioNDI1NTV74vj7cflD0372sQG/QGBmKpkcA9dFNOV97X18K9XZ2VkZ7vvjVvXy6p' +
        'iEYho0W2workhjY2O8q6vrvbq6uoS74hJfqdH/AgwAdLPFPTZgUqgAAAAASUVORK5CYII=',
    new google.maps.Size(37, 48),
    new google.maps.Point(0, 0),
    new google.maps.Point(18, 48)
);
JST['map/icons/handicap_parking'] = new google.maps.MarkerImage(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAwCAYAAACWhbMrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl' +
        'YWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cm' +
        'VTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUu' +
        'MC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3' +
        'd3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1w' +
        'TU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLj' +
        'Avc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFs' +
        'RG9jdW1lbnRJRD0ieG1wLmRpZDozQTE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLm' +
        'RpZDo0MzQ3QUIzNUMzQUIxMUUyODM0NUQ3RjgyNTg2ODI0RiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MzQ3QUIzNEMzQUIx' +
        'MUUyODM0NUQ3RjgyNTg2ODI0RiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RG' +
        'VyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RTFBRTFCMUEzQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgc3RSZWY6' +
        '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',
    new google.maps.Size(37, 47),
    new google.maps.Point(0, 0),
    new google.maps.Point(18, 47)
);

JST['map/icons/entrance'] = new google.maps.MarkerImage(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAvCAYAAABkBQNlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJl' +
        'YWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cm' +
        'VTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUu' +
        'MC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3' +
        'd3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1w' +
        'TU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLj' +
        'Avc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFs' +
        'RG9jdW1lbnRJRD0ieG1wLmRpZDozNzE0QjJENDgwQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLm' +
        'RpZDpEM0Y5ODEzOEMzQTgxMUUyOUQ1RkM3NDRFMjU3MEFEQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEM0Y5ODEzN0MzQTgx' +
        'MUUyOUQ1RkM3NDRFMjU3MEFEQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RG' +
        'VyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2RDFBRTFCMUEzQzNFMjExQjQ1QThBRTAyNTI0NDAzNyIgc3RSZWY6' +
        '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',
    new google.maps.Size(37, 47),
    new google.maps.Point(0, 0),
    new google.maps.Point(18, 47)
);
