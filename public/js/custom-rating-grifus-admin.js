/**
 * Custom Rating Grifus · Extensions For Grifus
 * 
 * @author     Josantonius - hello@josantonius.com
 * @copyright  Copyright (c) 2017
 * @license    GPL-2.0+
 * @link       https://github.com/Josantonius/Custom-Rating-Grifus.git
 * @since      1.0.0
 */

(function ($) {
    
   $(document).ready(function () {

      function restartAllRatings() {

         $.ajax({
            url: customRatingGrifusAdmin.ajax_url,
            type: "post",
            data: {
               action:        'restartAllRatings',
               custom_nonce:  customRatingGrifusAdmin.custom_nonce
            },
            success:function(data) {

               var response = JSON.parse(data);

               if (!response) { return; }

               console.log(response);

               if (response.ratings_restarted !== 0) {

                  $(".was-done").show();

                  $("#film-rating-badge").attr("data-badge", response.ratings_restarted);

               } else {

                  $(".nothing-was-done").show();
               }

               $("#film-rating-badge").addClass("success-icon").removeClass("picture-icon");

               $("#spinner-grifus").hide();

            },
            error: function(errorThrown){
               //console.log(JSON.stringify(errorThrown));
            } 

         });

      }

      //restartAllRatings();
      $("#restart-all-ratings").click(function(e) {

         e.preventDefault();

         /** Disable button */
         $(this).prop("disabled", true);

         /** Show icons */
         $("#process").slideDown();

         /** Show spinner */
         $("#spinner-grifus").show();

         restartAllRatings();

      });

   });

})(jQuery);
