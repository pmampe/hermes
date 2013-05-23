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
        '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',
    new google.maps.Size(32, 32),
    new google.maps.Point(0, 0),
    new google.maps.Point(16, 16)
)

JST['map/icons/parking'] = JST['map/icons/default'];
JST['map/icons/handicap_parking'] = JST['map/icons/default'];
JST['map/icons/entrance'] = JST['map/icons/default'];
