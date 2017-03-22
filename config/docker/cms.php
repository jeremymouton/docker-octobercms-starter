<?php
/*
| For additional options see
| https://github.com/octobercms/october/blob/master/config/cms.php
*/

return [
    'edgeUpdates' => false,
    'disableCoreUpdates' => true,
    'backendTimezone' => env('TZ', 'America/Denver'),
    'linkPolicy' => env('APP_LINKPOLICY', 'detect'),
    'backendForceSecure' => false,
];
