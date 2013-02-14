(function($) {
  var getCarat = function(el) {
    if (document.selection) {
      return 0;
    }
    return window.getSelection(); 
  }

  var placeCarat = function(el, pos) {
    try {
      if (document.selection) {
        var sel = document.selection.createRange();
        sel.moveStart('character', pos);
        sel.select();
      } else {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } catch(e) {}
  }

  var adjustLength = function(e, len) {
    var c = e.keyCode;
    
    // These characters delete, so we need to add a character to the complete text
    if(c == 8 || c == 46) {
      return len - 1;
    }
   
    // These characters render something, so we need to remove a character from the complete text
    if(c == 32 || c == 187 || (c > 186 && c <= 221) || (c > 48 && c <= 90)) {
      return len + 1;
    }
    return len;
  }

  var update = function(e, textSpan, completeSpan, original, replaceFunction) {
    var text = (textSpan.textContent || textSpan.innerText || '');
    var complete = '';
    var len = text.length;
    var replace = replaceFunction(text);

    if(e.type == 'keydown') {
      len = adjustLength(e, len);
    }

    if(replace.length > len) {
      complete = replace.substring(len);
    }
 
    var pos = getCarat(textSpan).anchorOffset;
    if(e.type == 'keydown' && e.keyCode == 13 || e.keyCode == 91) {
      if(e.keyCode == 13) {
        e.preventDefault();
      }
      
      text = text + complete;
      complete = '';
      pos = text.length;
    }

    textSpan.innerHTML = text;
    completeSpan.innerHTML = complete;
    original.value = text;
    placeCarat(textSpan, pos);
  }

  var init = function(el, options) {
    var replaceFunction = options.replace;
    if(typeof(replaceFunction) == 'undefined') {
      replaceFunction = function() { return '' };
    }
    var replace = $('<div><span class="text" contenteditable="true"></span><span class="suggestion" style="color: #aaa;"></span></div>');
    replace.css({
      height: el.height(),
      width: el.width(),
      '-webkit-appearance': 'textfield',
      '-moz-appearance': 'textfield',
      '-ms-appearance': 'textfield',
      'appearance': 'textfield',
      'overflow': 'hidden',
      'white-space': 'nowrap'
    });
    replace.find('span.text').css({ 'outline': 'none' });

    var textSpan = replace.get(0).childNodes[0];
    var completeSpan = replace.get(0).childNodes[1];
    var on = function(e) {
      update(e, textSpan, completeSpan, el.get(0), replaceFunction);
    }

    replace.on('keydown', 'span.text', on);
    replace.on('keyup', 'span.text', on);
    replace.on('click', function(e) {
      if(e.toElement != textSpan) {
        textSpan.focus();
        placeCarat(textSpan, $(textSpan).text().length);
      }
    });
    el.before(replace).hide();
  }

  $.fn.autofill = function(options) {
    this.each(function(i, el) {
      var el = $(el);
      if(el.prop('tagName') == 'INPUT' && el.attr('type') != 'checkbox' && el.attr('type') != 'hidden') {
        init(el, options);      
      }
    });

    return this;
  }
})(jQuery);
