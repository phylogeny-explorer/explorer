import React, { PropTypes } from 'react';
import { analytics } from '../config';

function Html({ title, description, style, script, children }) {
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <style id="css" dangerouslySetInnerHTML={{ __html: style }} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=M4mbjyp03J" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=M4mbjyp03J" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=M4mbjyp03J" />
        <link rel="manifest" href="/site.webmanifest?v=M4mbjyp03J" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=M4mbjyp03J" color="#212331" />
        <link rel="shortcut icon" href="/favicon.ico?v=M4mbjyp03J" />
        <meta name="msapplication-TileColor" content="#212331" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=M4mbjyp03J" />
        <meta name="theme-color" content="#212331" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {script && <script src={script} />}
        {analytics.google.trackingId &&
          <script
            dangerouslySetInnerHTML={{ __html:
            'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
            `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
          />
        }
        {analytics.google.trackingId &&
          <script src="https://www.google-analytics.com/analytics.js" async defer />
        }
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
};

export default Html;
