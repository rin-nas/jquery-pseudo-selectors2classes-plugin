/**
 *
 * @copyright Rinat Mukhtarov <rin-nas@ya.ru>
 * @version 2.5
 */
$(function() {
	var eventsNameSpace = 'pseudoSelectorToClass',
		makeExactSelector = function(elem) {
			var type = $(elem).attr('type');
			return (elem.tagName + (type ? '[type="' + type + '"]' : '')).toLowerCase();
		},
		makeHasClass = function(elem, pseudoClass) {
			var type = $(elem).attr('type');
			return ('has-' + (type ? type : elem.tagName) + '-' + pseudoClass).toLowerCase();
		},
		updateClasses = function(elem, selector) {
			var map = {
					//className (pseudoSelector) : callback
					'checked'	: function (elem) {
										return ('checked' in elem) ? elem.checked : null;
								  },
					'selected'	: function (elem) {
										return ('selected' in elem) ? elem.selected : null;
								  },
					'read-only'	: function (elem) {
										return ('readOnly' in elem) ? elem.readOnly : null;
								  },
					'enabled'   : function (elem) {
										return ('disabled' in elem) ? ! elem.disabled : null;
								  },
					'disabled'	: function (elem) {
										var disabled = ('disabled' in elem) ? elem.disabled : null;
										if (disabled === true && $(elem).data(':focus') === true) $(elem).data(':focus', false);
										return disabled;
								  },
					'hover'		: function (elem) {
										return $(elem).data(':hover');
								  },
					'focus'		: function (elem) {
										return $(elem).data(':focus');
										//return $(elem).is(':focus');
								  }
				};
			//if ('disabled' in elem) elem.enabled = ! elem.disabled;
			$.each(map, function(className, callback) {
				var result = callback(elem);
				if (typeof result !== 'boolean') return;
				$(elem).toggleClass(className, result);
				$(elem).parent().toggleClass(
					makeHasClass(elem, className),
					!! $(elem).parent().children(selector + '.' + className).length
				);
			});
		},
		propertyChange = function(event) {
			if (event.type == 'focus') $(this).data(':focus', ('disabled' in this) ? ! this.disabled : true);
			else if (event.type == 'blur')	$(this).data(':focus', false);
			else if (event.type == 'mouseenter') $(this).data(':hover', true);
			else if (event.type == 'mouseleave') $(this).data(':hover', false);
			if ($(this).is('input[type="radio"]')) {
				var exactSelector = 'input[type="radio"][name="' + this.name + '"]',
					radios = $(this).closest('form').find(exactSelector);
				if (! radios.length) radios = $(exactSelector);
				radios.each(function() {
					updateClasses(this, exactSelector);
				});
			}
			else updateClasses(this, makeExactSelector(this));
		};
	/*
	TODO?
	*) http://stackoverflow.com/questions/1882224/is-there-an-alternative-to-domattrmodified-that-will-work-in-webkit
	*) http://weblog.west-wind.com/posts/2008/Sep/12/jQuery-CSS-Property-Monitoring-Plugin-updated
	*) http://plugins.jquery.com/watch/
	*) patch jQuery.fn.val to return an empty value if the value matches the placeholder:

    $.fn.realVal = $.fn.val;
    $.fn.val = function() {
        var $element = $(this), val, placeholder;
        if(arguments.length > 0) return $element.realVal.apply(this, arguments);

        val = $element.realVal();
        placeholder = $element.attr('placeholder');

        return ((val == placeholder) ? '' : val);
    };
	*/
	$('input, select, textarea, button, a')
		.on('focus.{ns} blur.{ns}'.replace('{ns}', eventsNameSpace), propertyChange);
	$('input, select, textarea, button, fieldset, a, label')
		.on('mouseenter.{ns} mouseleave.{ns}'.replace('{ns}', eventsNameSpace), propertyChange);
	$('input, select, select optgroup, select option, textarea, button, fieldset')
		.on('change.{ns}'.replace('{ns}', eventsNameSpace), propertyChange);
	$('input, select, select optgroup, select option, textarea, button, fieldset, a, label')
		.on('propchange.{ns}'.replace('{ns}', eventsNameSpace), propertyChange)
		.trigger('propchange.{ns}'.replace('{ns}', eventsNameSpace));
});
