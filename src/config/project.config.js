/**
 * Public project configuration.
 *
 * External consumers should customize this file before adding pages.
 * Keep runtime values serializable so they can also be reused by build tools.
 */
export const projectConfig = {
  name: 'ulx-extention-builder',
  description: 'Build and compile standalone extension pages.',
  defaultTheme: {
    mode: 'ulx-default-mode',
    accent: null,
    font: null,
  },
  hostSdk: {
    enabled: true,
    sdkUrl:
      'https://static.zohocdn.com/backstage/v1.0/javascript/sdk/ZSDK.min.js',
    frameClientUrl:
      'https://static.zohocdn.com/backstage/v1.0/javascript/sdk/bs-frame-client.js',
  },
};
