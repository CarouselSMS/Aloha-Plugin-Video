/*
* Aloha Video Plugin
*/

GENTICS.Aloha.ui.TextField = function(properties) {
	this.init(properties)
};
GENTICS.Aloha.ui.TextField.prototype = new GENTICS.Aloha.ui.Button();
GENTICS.Aloha.ui.TextField.prototype.getExtConfigProperties = function() {
	return {
		xtype: "textfield",
		width: this.width || undefined,
		id: this.id,
		validator: this.validator || undefined,
		placeholder: this.placeholder || undefined,
		listeners: {afterrender: function() {jQuery(this.el.dom).attr('placeholder', this.placeholder);}}
	}
};
GENTICS.Aloha.ui.TextField.prototype.getValue = function() {
	if (this.extButton) {
		return this.extButton.getValue()
	}
	return null
};
GENTICS.Aloha.ui.TextField.prototype.setValue = function(v) {
	if (this.extButton) {
		this.extButton.setValue(v)
	}
};
GENTICS.Aloha.ui.TextField.prototype.validate = function() {
	if (this.extButton) {
		return this.extButton.validate()
	}
	return null
};

/**
 * Video Plugin
 */
GENTICS.Aloha.Video = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.Video');

/**
 * Configure the available languages
 */
GENTICS.Aloha.Video.languages = ['en', 'ru'];

/**
 * Initialize the plugin
 */
GENTICS.Aloha.Video.init = function () {

  var that = this;

  var stylePath = GENTICS.Aloha.settings.base + '/plugins/com.gentics.aloha.plugins.Video/css/Video.css';
  jQuery('<link rel="stylesheet" />').attr('href', stylePath).appendTo('head');

  var urlField = new GENTICS.Aloha.ui.TextField({
		width: 320,
		placeholder: 'Insert YouTube video URL here',
		validator: function(value) { return (!value || value.match(/watch\?v=([A-Za-z0-9\-_]+)(.*)/) ? true : 'Invalid YouTube URL'); }
	});

  var button = new GENTICS.Aloha.ui.Button({
    "iconClass" : "GENTICS_button_video",
    "size" : "small",
    "onclick": function () {
	  var validUrl = urlField.validate();
	  var url = urlField.getValue();

	  if (validUrl && url) {
        var range = GENTICS.Aloha.Selection.getRangeObject();

        //jQuery.getJSON('http://oohembed.com/oohembed/?format=json&url=' + escape(url) + '&callback=?', function(data){

          var video_slug = url.match(/watch\?v=([A-Za-z0-9\-_]+)(.*)/)[1];
          var iframe = '<iframe title="YouTube video player" width="425" height="349" src="http://www.youtube.com/embed/' + video_slug + '?wmode=transparent" frameborder="0" allowfullscreen></iframe>';
          var embedCode = jQuery('<p style="text-align: center;">' + iframe + '</p>');
          embedCode.find('object').attr('contenteditable', false);
          GENTICS.Utils.Dom.insertIntoDOM(embedCode, range, jQuery(GENTICS.Aloha.activeEditable.obj));
        //});

        urlField.setValue('');
        //range.select();
      }
    }
  });

  GENTICS.Aloha.FloatingMenu.addButton(
    "GENTICS.Aloha.continuoustext",
    urlField,
    that.i18n("floatingmenu.tab.video"), 1
  );

  GENTICS.Aloha.FloatingMenu.addButton(
    "GENTICS.Aloha.continuoustext",
    button,
    that.i18n("floatingmenu.tab.video"), 1
  );

};