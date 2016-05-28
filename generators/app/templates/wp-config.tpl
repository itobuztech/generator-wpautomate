<?php
/**
 * Custom WordPress configurations on "wp-config.php" file.
 *
 * This file has the following configurations: MySQL settings, Table Prefix, Secret Keys, WordPress Language, ABSPATH and more.
 * For more information visit {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php} Codex page.
 * 
 * @package WordPress
 * 
 */


/* MySQL settings */
define( 'DB_NAME',     'db_name' );
define( 'DB_USER',     'db_user' );
define( 'DB_PASSWORD', 'wpdbPass' );
define( 'DB_HOST',     'wpdbHost' );
define( 'DB_CHARSET',  'wpdbChar' );


/* MySQL database table prefix. */
$table_prefix = 'wp_';


/* Authentication Unique Keys and Salts. */
define('AUTH_KEY',         '(yE/x+(:+MpVDJ@)WG!BHbNMoz).B~l,XJ8ze=0TRj8FMJd@ ^#! L+6,aw9k=^r');
define('SECURE_AUTH_KEY',  '9IVdM/]tP<-[j|Nmv+w-U7cT.k;GJ*Bnm`$mA/n__)x]-r/R+r,/-*?MPInx@|u+');
define('LOGGED_IN_KEY',    '/@I]t|F ,py^7W_-$FQR8g6hb/w4Mh^*@a>|(oX]Pl -[D-6L&]&>bPAXT4+7|ek');
define('NONCE_KEY',        '-unp+C9JD-3,E NpE|<%X5G*W{4m5QPaQ;,.;VblCSXS|n^)Qwr]+?k[n;vi^3KW');
define('AUTH_SALT',        '8tE)yE)h|df40{iQ:=jS tf=^ED:O~.mi5>k`f7*{cp45~j*#%JP,1-h*9[Si2T^');
define('SECURE_AUTH_SALT', 'Dpx[;w;]|>836;5#w2|+T+ggB5Q#i;p:+9}cebu8F<;qjo#[?s>dQ>X!ingii?ZN');
define('LOGGED_IN_SALT',   ':(eZ=Z&M$^0UE?}.oj}]HzM@iM.Fs.e1eVMaYp$x3U3EMky3gJ?W0SV2/d]yy#Yx');
define('NONCE_SALT',       '$2j`vrj6|r@ooXDoPX;-/UvV_bW -sQ46,3sc~+qn4Ru=jVy2_SK{Q^E&@0kqP/4');




/* Specify maximum number of Revisions. */
define( 'WP_POST_REVISIONS', '20' );


/* WordPress debug mode for developers. */
define( 'WP_DEBUG',         true );
define( 'WP_DEBUG_LOG',     true );
define( 'WP_DEBUG_DISPLAY', true );
define( 'SCRIPT_DEBUG',     true );


/* PHP Memory */


/* WordPress Cache */
define( 'WP_CACHE', true );


/* Compression */
define( 'COMPRESS_CSS',        true );
define( 'COMPRESS_SCRIPTS',    true );
define( 'CONCATENATE_SCRIPTS', true );
define( 'ENFORCE_GZIP',        true );


/* Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/* Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');