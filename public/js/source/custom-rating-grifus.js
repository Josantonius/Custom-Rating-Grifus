/**
 * Custom Rating Grifus · Extensions For Grifus
 *
 * @author    Josantonius <hello@josantonius.com>
 * @package   Josantonius/Custom-Rating-Grifus
 * @copyright 2017 - 2018 (c) Josantonius - Custom Rating Grifus
 * @license   GPL-2.0+
 * @link      https://github.com/eliasis-framework/custom-rating-grifus.git
 * @since     1.0.0
 */

 jQuery(document).ready( function($) {

   if (typeof eliasis !== 'undefined') {
      var custom_rating_grifus = eliasis;
   } else {
      var custom_rating_grifus = customRatingGrifus;
   }

   function selectRating() {

     /**
      * Styles.
      */
      var colorThemeClass = ' white';

      if (custom_rating_grifus.dark === "true") {

         colorThemeClass = ' dark';
      }

      /**
      * Get movie rating, remove links and select star rating.
      */
      var value = new Number($("span[itemprop=ratingValue]").text());

      $(".bar").remove();

      $(".imdb_r").prepend(
         '<fieldset id="movie-rating" class="rating' + colorThemeClass + '">' + 
            '<input type="radio" id="star10" name="rating" value="10" />' +
            '<label class = "full" for="star10" title="10 stars"></label>' +
            '<input type="radio" id="star9" name="rating" value="9" />' +
            '<label class = "full" for="star9" title="9 stars"></label>' +
            '<input type="radio" id="star8" name="rating" value="8" />' +
            '<label class = "full" for="star8" title="8 stars"></label>' +
            '<input type="radio" id="star7" name="rating" value="7" />' +
            '<label class = "full" for="star7" title="7 stars"></label>' +
            '<input type="radio" id="star6" name="rating" value="6" />' +
            '<label class = "full" for="star6" title="6 star"></label>' +
            '<input type="radio" id="star5" name="rating" value="5" />' +
            '<label class = "full" for="star5" title="5 stars"></label>' +
            '<input type="radio" id="star4" name="rating" value="4" />' +
            '<label class = "full" for="star4" title="4 stars"></label>' +
            '<input type="radio" id="star3" name="rating" value="3" />' +
            '<label class = "full" for="star3" title="3 stars"></label>' +
            '<input type="radio" id="star2" name="rating" value="2" />' +
            '<label class = "full" for="star2" title="2 stars"></label>' +
            '<input type="radio" id="star1" name="rating" value="1" />' +
            '<label class = "full" for="star1" title="1 star"></label>'+
         '</fieldset>'
      );

      $(".rating, .dato").css('opacity', '1');

      $('#star' + value.toFixed()).click();
   }

   function changeIMDBsingleName() {
       
      $(".imdb_r a:first, .dato a:first").attr("href", "#");

      $(".imdb_r a:first, .dato a:first").click(function(e) {
        e.preventDefault();
      });

      $(".dato a").each(function() {
         var text = $(this).text();
         text = text.replace("IMDB", custom_rating_grifus.imdb_button);
         $(this).text(text);
      });
   }

   function ajaxRating() {
   
      $("input[name=rating]").click(function(){

         var vote = $(this).val();

         $.ajax({
            url: custom_rating_grifus.ajax_url,
            type: "post",
            data: {
               action: 'add_movie_rating',
               nonce:  custom_rating_grifus.nonce,
               postID: custom_rating_grifus.postID,
               vote:   vote
            },
            success:function(data){

               var response = JSON.parse(data);

               //console.log(response);

               if (!response) { return; }

               $("b[itemprop=ratingCount]").text(response.total);
               $("span[itemprop=ratingValue]").text(response.rating);
               $('.dato b:first').text(response.rating + '/');
            },
            error: function(errorThrown){
               //console.log(errorThrown);
            } 
         });
      });
   }

   if($(".imdb_r a:first, .dato a:first").length) {

      if (custom_rating_grifus.is_active) {

         changeIMDBsingleName();

         selectRating();

         ajaxRating();
      
      } else {

         $(".bar, .dato").css('opacity', '1');
      }
   }
});
