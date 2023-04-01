import { SPSApplication } from "./SPSApplication";
import { Config, PixelStreaming, TextParameters } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.2';

// Apply default styling from Epic's frontend
export const PixelStreamingApplicationStyles = new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

declare var WEBSOCKET_URL: string;
let signallingServerAddress = WEBSOCKET_URL;
if (signallingServerAddress == '') {
    // define our signallingServerProtocol to be used based on whether
    // or not we're accessing our frontend via a tls
    let signallingServerProtocol = 'ws:';
    if (location.protocol === 'https:') {
        signallingServerProtocol = 'wss:';
    }

    // build the websocket endpoint based on the protocol used to load the frontend
    signallingServerAddress = signallingServerProtocol + '//' + window.location.hostname;

    // if the frontend for an application is served from a base-level domain
    // it has a trailing slash, so we need to account for this when appending the 'ws' for the websocket ingress
    if (window.location.pathname == "/") {
        signallingServerAddress += '/ws';
    } else {
        signallingServerAddress += (window.location.pathname + '/ws');
    }
}

document.body.onload = function () {

	// Example of how to set the logger level
	//libfrontend.Logger.SetLoggerVerbosity(10);

	// Create a config object.
	// Note: This config is extremely important, SPS only supports the browser sending the offer.
	const config = new Config({ useUrlParams: true, initialSettings: { OfferToReceive: true, TimeoutIfIdle: true } });
	config.setTextSetting(TextParameters.SignallingServerUrl, signallingServerAddress);

	// Create a Native DOM delegate instance that implements the Delegate interface class
	const stream = new PixelStreaming(config);
	const spsApplication = new SPSApplication({ 
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode) /* Light/Dark mode support. */
	});

	document.body.appendChild(spsApplication.rootElement);
}
