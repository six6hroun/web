document.addEventListener('DOMContentLoaded', function() {
    let accordions = document.querySelectorAll('.accordion');
    accordions.forEach((accordion) => {
        accordion.addEventListener('click', function() {
            let panel = this.nextElementSibling;
            panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
            
            if ($('.blob').length > 0) {
                updateBlobPosition($(this));
            }
        });
    });

    $(function() {
        const BLOB_SIZE = 40;
        const BLOB_OFFSET = 10; 
        
        function updateBlobPosition($element) {
            var elementPos = $element.offset();
            var elementHeight = $element.outerHeight();
            
            $('.blob').css({
                'left': (elementPos.left - BLOB_OFFSET) + 'px',
                'top': (elementPos.top + elementHeight / 2) + 'px',
                'width': BLOB_SIZE + 'px',
                'height': BLOB_SIZE + 'px',
                'opacity': 1,
                'transform': 'translateY(-50%)'
            });
        }

        if ($('.blob').length === 0) {
            $('body').append('<div class="blob"></div>');
        }
        
        $('.blob').css({
            'width': BLOB_SIZE + 'px',
            'height': BLOB_SIZE + 'px',
            'background': 'radial-gradient(circle, rgba(163, 31, 130, 0.8) 0%, rgba(231, 20, 214, 0.4) 70%)',
            'box-shadow': '0 0 15px rgba(80, 11, 80, 0.8)'
        });
        
        updateBlobPosition($('.accordion').first());
        
        $('.accordion').hover(
            function() {
                updateBlobPosition($(this));
            }
        );
    });
});