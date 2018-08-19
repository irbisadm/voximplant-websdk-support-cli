# Voximplant websdk support plugin

This plugin simplifies collecting logs for the Voximplant WebSDK. You can use this module as is or create your code based on
it. This module based on the [WebSDK logging callback](https://voximplant.com/docs/references/websdk/voximplant/client#setloggercallback).

## Installation
You can use this module as a regular script. Just import it *after* the Voximplant WebSDK:
```html
<script type="text/javascript" src="//cdn.voximplant.com/edge/voximplant.min.js"></script>​
<script type="text/javascript" src="voximplant.support.min.js"></script>​
```
The script will add the `VoxImplantSupport` property to the `window` object.

## Initialization
Please, call the `init` function with a collected logs URL as an argument:

```javascript
window.VoxImplantSupport.init('https://example.org/reportUrl')
```
Parameters

|parameter|required|default|description|
|---------|--------|-------|-----------|
|reportServer|+|-|`String` Server for sending logs|
|library|-|window.VoxImplant|`Link` URL to the Voximplant WebSDK, if you don't export it to the window|

## Send report
You can send logs manually, using the `sendLogs` function:
```javascript
window.VoxImplantSupport.sendLogs();
``` 
Parameters

|parameter|required|default|description|
|---------|--------|-------|-----------|
|additionalInfo|-|-|`String` Additional string info|
|asForm|-|false|`Boolean` If true, logs will be sent with `Content-Type="application/x-www-form-urlencoded"`; otherwise `Content-Type="application/json"`|

Logs will be sent in the `sdk_log` field. 

The additional info will be sent in the `info` field.

## Callbacks
*onLogSent* - success callback function 

*onSendingError* - error callback function

```javascript
window.VoxImplantSupport.onLogSent = () => {
  //Your handler in case of success
}
window.VoxImplantSupport.onSendingError = () => {
  //Your handler in case of error
}
```
If handlers are not set, the library displays result as a default `alert` message.

## Render button
You can render a default button with this library:
```javascript
window.VoxImplantSupport.renderButton()
```

Parameters

|parameter|required|default|description|
|---------|--------|-------|-----------|
|parent|-|document.window|`HTMLElement` Element for the button rendering|
|text|-|'Report voice/video issue'|`String` Text displayed on a button|
|cssClass|-|'voximplant-support__button'|`String` Class name for a button. If not set, the default CSS styles will be appllied.|
