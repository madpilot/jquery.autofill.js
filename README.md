# jquery.autofill.js

jquery.autofill.js adds autofill to a HTML input. What does autofill do? It trys to guess what you are typing and shows a suggestion in light grey.

See it in action: [http://htmlpreview.github.com/?https://github.com/madpilot/jquery.autofill.js/blob/master/example/index.html]

## How it works

Autofill hides your input field and replaces it with a contenteditable span (inside a div). contenteditable elements acts almost exactly like input fields, except you can embed html in them. We exploit this by adding another span that holds the suggested text.

## Example

```javascript
$('input[type=text]').autofill({
  replace: function(text) {
    var replace = searchTheStringForAMatch(text);
    return replace;
  }
});
```

## Browsers

It seems to work in IE 7, 8, 9, 10, Chrome, Firefox and Safari. It's not working in Opera at the moment.

## Contributing to jquery.autofill.js
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet.
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it.
* Fork the project.
* Start a feature/bugfix branch.
* Commit and push until you are happy with your contribution.
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2012 [MadPilot Productions](http://www.madpilot.com.au/). See LICENSE.txt for further details.
