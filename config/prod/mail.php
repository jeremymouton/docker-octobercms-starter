<?php
/*
| For additional options see
| https://github.com/octobercms/october/blob/master/config/mail.php
*/

return [
    'driver' => 'smtp',
    'host' => env('MAIL_SMTP_HOST', null),
    'port' => 587,
    'from' => [
      'address' => env('MAIL_FROM_ADDRESS', null),
      'name' => env('MAIL_FROM_NAME', null)
    ],
    'encryption' => 'tls',
    'username' => env('MAIL_SMTP_USERNAME', null),
    'password' => env('MAIL_SMTP_PASSWORD', null),
];
