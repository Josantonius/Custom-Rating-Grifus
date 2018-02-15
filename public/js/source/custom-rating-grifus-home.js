/**
 * Custom Rating Grifus · Extensions For Grifus
 *
 * @author    Josantonius <hello@josantonius.com>
 * @package   Josantonius/Custom-Rating-Grifus
 * @copyright 2017 - 2018 (c) Josantonius - Custom Rating Grifus
 * @license   GPL-2.0+
 * @link      https://github.com/Josantonius/Custom-Rating-Grifus.git
 * @since     1.0.0
 */

 jQuery(document).ready( function($) {

   function changeIMDBsingleName() {
       
      $(".dato").each(function() {
         var text = $(this).text();
         text = text.replace("IMDB", eliasis.imdb_button);
         $(this).text(text);
      });
   }

   if ($(".dato").length) {
   
   	changeIMDBsingleName();
   }

});
