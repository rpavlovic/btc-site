(function($)
{	
    "use strict";

    $(document).ready(function()
    {	
    	//global variables that are used on several ocassions
    	$.avia_utilities = $.avia_utilities || {};
    	
    	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 'ontouchstart' in document.documentElement)
    	{
    		$.avia_utilities.isMobile =  true;
    	}
    	else
    	{
    		$.avia_utilities.isMobile =  false;
    	}
    
    	//activate fixed bg fallback for mobile
    	if($.fn.avia_mobile_fixed)
		$('.avia-bg-style-fixed').avia_mobile_fixed();
    	
    	//activate parallax scrolling for backgrounds.
    	if($.fn.avia_parallax)
		$('.av-parallax').avia_parallax();
    	
    	//calculate the browser height and append a css rule to the head
		if($.fn.avia_browser_height)
		$('.av-minimum-height, .avia-fullscreen-slider').avia_browser_height();
		
		//calculate the height of each video section
		if($.fn.avia_video_section)
		 $('.av-section-with-video-bg').avia_video_section();
		
		//creates team social icon tooltip
        new $.AviaTooltip({'class': "avia-tooltip", data: "avia-tooltip", delay:0, scope: "body"});
		
		//creates icon element tooltip
		new $.AviaTooltip({'class': "avia-tooltip avia-icon-tooltip", data: "avia-icon-tooltip", delay:0, scope: "body"});

        activate_shortcode_scripts();
        
        //layer slider height helper
        $('.avia-layerslider').layer_slider_height_helper();
        
        //"ajax" portfolio
        $('.grid-links-ajax').avia_portfolio_preview();
        
        // actiavte the masonry script: sorting/loading/etc
		if($.fn.avia_masonry)
		$('.av-masonry').avia_masonry();
		
		//activate the accordion
		if($.fn.aviaccordion)
		$('.aviaccordion').aviaccordion();
		
    });


	$(window).load(function(){
	//initialize after images are loaded
	});




// -------------------------------------------------------------------------------------------
// ACTIVATE ALL SHORTCODES
// -------------------------------------------------------------------------------------------

	function activate_waypoints(container)
	{
		//activates simple css animations of the content once the user scrolls to an elements
		if($.fn.avia_waypoints)
		{
			if(typeof container == 'undefined'){ container = 'body';};

			$('.avia_animate_when_visible', container).avia_waypoints();
			$('.avia_animate_when_almost_visible', container).avia_waypoints({ offset: '80%'});
		}
	}


    function activate_shortcode_scripts(container)
	{
		if(typeof container == 'undefined'){ container = 'body';}
		
		//activates the form shortcode
		if($.fn.avia_ajax_form)
		{
			$('.avia_ajax_form', container).avia_ajax_form();
		}
		
		activate_waypoints(container);
		
		//activate the video api
		if($.fn.aviaVideoApi)
		{
			$('.avia-slideshow iframe[src*="youtube.com"], .av_youtube_frame, .avia-slideshow iframe[src*="vimeo.com"], .avia-slideshow video').aviaVideoApi({}, 'li');
		}
		
	    //activates the toggle shortcode
		if($.fn.avia_sc_toggle)
		{
			$('.togglecontainer', container).avia_sc_toggle();
		}
		
		//activates the tabs shortcode
		if($.fn.avia_sc_tabs)
		{
			$('.top_tab', container).avia_sc_tabs();
			$('.sidebar_tab', container).avia_sc_tabs({sidebar:true});
		}

		//activates behavior and animation for gallery
		if($.fn.avia_sc_gallery)
		{
			$('.avia-gallery', container).avia_sc_gallery();
		}
		
		//activates animated number shortcode
		if($.fn.avia_sc_animated_number)
		{
			$('.avia-animated-number', container).avia_sc_animated_number();
		}
		
		//animation for elements that are not connected like icon shortcode
		if($.fn.avia_sc_animation_delayed)
		{
			$('.av_font_icon', container).avia_sc_animation_delayed({delay:100});
			$('.avia-image-container', container).avia_sc_animation_delayed({delay:100});
			$('.av-hotspot-image-container', container).avia_sc_animation_delayed({delay:100});
		}

		//activates animation for iconlist
		if($.fn.avia_sc_iconlist)
		{
			$('.avia-icon-list', container).avia_sc_iconlist();
		}

		//activates animation for progress bar
		if($.fn.avia_sc_progressbar)
		{
			$('.avia-progress-bar-container', container).avia_sc_progressbar();
		}

		//activates animation for testimonial
		if($.fn.avia_sc_testimonial)
		{
			$('.avia-testimonial-wrapper', container).avia_sc_testimonial();
		}
		
		//activate the fullscreen slider
		$('.avia-slideshow.av_fullscreen', container).aviaFullscreenSlider();
		
		//activate the aviaslider
		$('.avia-slideshow:not(.av_fullscreen)', container).aviaSlider();
		
        //content slider
        $('.avia-content-slider-active', container).aviaSlider({wrapElement: '.avia-content-slider-inner', slideElement:'.slide-entry-wrap'});

        //testimonial slider
        $('.avia-slider-testimonials', container).aviaSlider({wrapElement: '.avia-testimonial-row', slideElement:'.avia-testimonial'});
        
        //load and activate maps
        if($.fn.aviaMaps)
        {
        	$('.avia-google-map-container', container).aviaMaps();
    	}
    	
    	 //load magazine sorting
        if($.fn.aviaMagazine)
        {
        	$('.av-magazine-tabs-active', container).aviaMagazine();
    	}
    	
    	 //load image hotspot
        if($.fn.aviaHotspots)
        {
        	$('.av-hotspot-image-container', container).aviaHotspots();
    	}
    	
    	 //load countdown
        if($.fn.aviaCountdown)
        {
        	$('.av-countdown-timer', container).aviaCountdown();
    	}
    	
    	
    }



// -------------------------------------------------------------------------------------------
// 
// AVIA Countdown
// 
// -------------------------------------------------------------------------------------------
(function($)
{ 
	"use strict";
	
	var _units	= ['weeks','days','hours','minutes','seconds'],
		_second = 1000,
		_minute = _second * 60,
		_hour 	= _minute * 60,
		_day 	= _hour * 24,
		_week	= _day * 7,	
		ticker	= function(_self)
		{
			var _time		= {},
				_now 		= new Date(),
				_timestamp  = _self.end - _now;
			
			if(_timestamp <= 0)
			{
				clearInterval(_self.countdown);
				return;
			}	
			
			_self.time.weeks   	= Math.floor( _timestamp / _week);
			_self.time.days 	= Math.floor((_timestamp % _week) / _day);
			_self.time.hours	= Math.floor((_timestamp % _day) / _hour); 
			_self.time.minutes 	= Math.floor((_timestamp % _hour) / _minute); 
			_self.time.seconds 	= Math.floor((_timestamp % _minute) / _second); 
			
			switch(_self.data.maximum)
			{
				case 1: _self.time.seconds 	= Math.floor(_timestamp / _second); break;
				case 2: _self.time.minutes 	= Math.floor(_timestamp / _minute); break;
				case 3: _self.time.hours	= Math.floor(_timestamp / _hour); 	break;
				case 4: _self.time.days 	= Math.floor(_timestamp / _day); 	break;
			}
			
			for (var i in _self.time)
			{	
				if(typeof _self.update[i] == "object")
				{
					if(_self.firstrun || _self.oldtime[i] != _self.time[i])
					{
						var labelkey = ( _self.time[i] === 1 ) ? "single" : "multi"; 
					
						_self.update[i].time_container.text(_self.time[i]);
						_self.update[i].label_container.text(_self.update[i][labelkey]);
					}
				}
			}
			
			//show ticker
			if(_self.firstrun) _self.container.addClass('av-countdown-active')
			
			_self.oldtime 	= $.extend( {}, _self.time );
			_self.firstrun	= false;
		};
		
	
	$.fn.aviaCountdown = function( options )
	{	
		if(!this.length) return; 

		return this.each(function()
		{
			var _self 			= {};
			_self.update		= {};
			_self.time			= {};			
			_self.oldtime		= {};			
			_self.firstrun		= true;			
			
			_self.container		= $(this);
			_self.data			= _self.container.data();
			_self.end			= new Date(_self.data.year, _self.data.month, _self.data.day, _self.data.hour, _self.data.minute );
			
			for (var i in _units)
			{
				_self.update[_units[i]] = {
					time_container:  _self.container.find('.av-countdown-' + _units[i] + ' .av-countdown-time'),
					label_container: _self.container.find('.av-countdown-' + _units[i] + ' .av-countdown-time-label'),
				};
				
				if(_self.update[_units[i]].label_container.length)
				{
					_self.update[_units[i]].single = _self.update[_units[i]].label_container.data('label');
					_self.update[_units[i]].multi  = _self.update[_units[i]].label_container.data('label-multi');
				}
			}
			
			ticker(_self);
			_self.countdown 	= setInterval(function(){ ticker(_self); }, _self.data.interval);

			
		});
	}
	
}(jQuery));



// -------------------------------------------------------------------------------------------
// 
// AVIA Image Hotspots
// 
// -------------------------------------------------------------------------------------------
(function($)
{ 
	"use strict";

	$.fn.aviaHotspots = function( options )
	{
		if(!this.length) return; 

		return this.each(function()
		{
			var _self = {};
			
			_self.container	= $(this);
			_self.hotspots	= _self.container.find('.av-image-hotspot');
			
				_self.container.on('avia_start_animation', function()
				{
					setTimeout(function()
					{
						_self.hotspots.each(function(i)
						{
							var current = $(this);
							setTimeout(function(){ current.addClass('av-display-hotspot'); },300 * i);
						});
					},400);
				});

		});
	}
	
}(jQuery));




// -------------------------------------------------------------------------------------------
// 
// AVIA Magazine function for magazine sorting
// 
// -------------------------------------------------------------------------------------------
(function($)
{ 
	"use strict";
	
	var animating = false,
		methods = {
		
		switchMag: function(clicked, _self)
		{
			var current 		= $(clicked)
			
			if(current.is('.active_sort') || animating) return;
			
			var filter			= current.data('filter'),
				oldContainer	= _self.container.filter(':visible'),
				newContainer	= _self.container.filter('.' + filter);
			
			//switch Class
			animating = true;
			_self.sort_buttons.removeClass('active_sort');
			current.addClass('active_sort');
			
			//apply fixed heiht for transition
			_self.magazine.height(_self.magazine.outerHeight());
			
			//switch items
			oldContainer.avia_animate({opacity:0}, 200, function()
			{
				oldContainer.css({display:'none'});
				newContainer.css({opacity:0, display:'block'}).avia_animate({opacity:1}, 150, function()
				{
					_self.magazine.avia_animate({height: (newContainer.outerHeight() + _self.sort_bar.outerHeight())}, 150, function()
					{
						_self.magazine.height('auto');
						animating = false;
					});
					
				});
			});
		}
	};
	
	
	$.fn.aviaMagazine = function( options )
	{
		if(!this.length) return; 

		return this.each(function()
		{
			var _self = {};
			 
			_self.magazine		= $(this),
			_self.sort_buttons 	= _self.magazine.find('.av-magazine-sort a');
			_self.container		= _self.magazine.find('.av-magazine-group');
			_self.sort_bar		= _self.magazine.find('.av-magazine-top-bar');
			
			_self.sort_buttons.on('click', function(e){ e.preventDefault(); methods.switchMag(this, _self);  } );
		});
	}
	
}(jQuery));

// -------------------------------------------------------------------------------------------
// 
// AVIA MAPS API - loads the google maps api asynchronously 
// 
// afterwards applies the map to the container
// 
// -------------------------------------------------------------------------------------------


(function($)
{
    "use strict";

	$.AviaMapsAPI  =  function(options, container)
	{
		if(typeof window.av_google_map == 'undefined')
		{
			$.avia_utilities.log('Map creation stopped, var av_google_map not found'); return
		}
	
		// gatehr container and map data
		this.container	= container;
		this.$container	= $( container );
		this.$body  	= $('body');
		this.$mapid		= this.$container.data('mapid') - 1; 
		this.$data		= window.av_google_map[this.$mapid];
		this.retina 	= window.devicePixelRatio > 1;
		
		// set up the whole api object
		this._init( options );
	}
	
	$.AviaMapsAPI.apiFiles = 
	{
		loading: false, 
		finished: false, 
		src: 'https://maps.googleapis.com/maps/api/js?v=3.6&sensor=false&callback=aviaOnGoogleMapsLoaded' 
	}
	
  	$.AviaMapsAPI.prototype =
    {
    	_init: function()
    	{
    		this._bind_execution();
    		this._getAPI();
    	},
    	
    	_getAPI: function( )
		{	
			//make sure the api file is loaded only once
			if((typeof window.google == 'undefined' || typeof window.google.maps == 'undefined') && $.AviaMapsAPI.apiFiles.loading == false)
			{	
				$.AviaMapsAPI.apiFiles.loading = true;
				var script 	= document.createElement('script');
				script.type = 'text/javascript';	
				script.src 	= $.AviaMapsAPI.apiFiles.src;
				
      			document.body.appendChild(script);
			}
			else if((typeof window.google != 'undefined' && typeof window.google.maps != 'undefined') || $.AviaMapsAPI.apiFiles.loading == false)
			//else if($.AviaMapsAPI.apiFiles.finished === true)
			{
				this._applyMap();
			}
		},
		
		_bind_execution: function()
		{
			this.$body.on('av-google-maps-api-loaded', $.proxy( this._applyMap, this) );
		},
		
		_applyMap: function()
		{
			if(typeof this.map != 'undefined') return;
			if(!this.$data.marker || !this.$data.marker[0] || !this.$data.marker[0].long || !this.$data.marker[0].long)
			{
				$.avia_utilities.log('Latitude or Longitude missing', 'map-error'); 
				return;
			}
			
			var _self = this,
				mobile_drag = $.avia_utilities.isMobile ? this.$data.mobile_drag_control : true,
				zoomValue 	= this.$data.zoom == "auto" ? 10 : this.$data.zoom;
			
			this.mapVars = {
				mapMaker: false, //mapmaker tiles are user generated content maps. might hold more info but also be inaccurate
				mapTypeControl: false,
				backgroundColor:'transparent',
				streetViewControl: false,
				panControl: this.$data.pan_control,
				zoomControl: this.$data.zoom_control,
				draggable: mobile_drag,
				scrollwheel: false,
				zoom: zoomValue,
				mapTypeId:google.maps.MapTypeId.ROADMAP,
				center: new google.maps.LatLng(this.$data.marker[0].lat, this.$data.marker[0].long),
				styles:[{featureType: "poi", elementType: "labels", stylers: [ { visibility: "off" }] }]
			};

			this.map = new google.maps.Map(this.container, this.mapVars);
		
			this._applyMapStyle();
			
			if(this.$data.zoom == "auto")
			{
				this._setAutoZoom();
			}
			
			google.maps.event.addListenerOnce(this.map, 'tilesloaded', function() {	
				_self._addMarkers();
			});
		},
		
		_setAutoZoom: function()
		{
			var bounds = new google.maps.LatLngBounds();
			
			for (var key in this.$data.marker) 
			{
				bounds.extend( new google.maps.LatLng (this.$data.marker[key].lat , this.$data.marker[key].long) );
			}
			
			this.map.fitBounds(bounds);
		},
		
		_applyMapStyle: function()
		{
			var stylers = [], style = [], mapType;
			
			if(this.$data.hue != "") stylers.push({hue: this.$data.hue});
			if(this.$data.saturation != "") stylers.push({saturation: this.$data.saturation});
			
			if(stylers.length)
			{
				style = [{
					      featureType: "all",
					      elementType: "all",
					      stylers: stylers
					    }, {
					      featureType: "poi",
					      stylers: [
						{ visibility: "off" }
					      ]
					    }];
					
				mapType = new google.maps.StyledMapType(style, { name:"av_map_style" });
				this.map.mapTypes.set('av_styled_map', mapType);
				this.map.setMapTypeId('av_styled_map');
			}
		},
		
		_addMarkers: function()
		{
			for (var key in this.$data.marker) 
			{	
				var _self = this;
				
				(function(key, _self) 
				{
					setTimeout(function()
					{
							var marker = "";
							
							if(!_self.$data.marker[key] || !_self.$data.marker[key].long || !_self.$data.marker[key].long)
							{
								$.avia_utilities.log('Latitude or Longitude for single marker missing', 'map-error'); 
								return;
							}
							
							_self.$data.LatLng = new google.maps.LatLng(_self.$data.marker[key].lat, _self.$data.marker[key].long);
							
							var markerArgs = {
			        		  flat: false,
						      position: _self.$data.LatLng,
						      animation: google.maps.Animation.BOUNCE,
						      map: _self.map,
						      title: _self.$data.marker[key].address,
						      optimized: false
						    };
						    
						    //set a custom marker image if available. also set the size and reduce the marker on retina size so its sharp
						    if(_self.$data.marker[key].icon && _self.$data.marker[key].imagesize)
						    { 
						    	var size = _self.$data.marker[key].imagesize, half = "", full = "";
						    	
						    	if(_self.retina && size > 40) size = 40;			//retina downsize to at least half the px size
						    	half = new google.maps.Point(size / 2, size ) ; 	//used to position the marker
						    	full = new google.maps.Size(size , size ) ; 		//marker size
						    	markerArgs.icon = new google.maps.MarkerImage(_self.$data.marker[key].icon, null, null, half, full);
						    }
							
			        		marker = new google.maps.Marker(markerArgs);
			        		
			        		setTimeout(function(){ marker.setAnimation(null); _self._infoWindow(_self.map, marker, _self.$data.marker[key]); },500);
			        		
		        	},200 * (parseInt(key,10) + 1));
		        		
		        }(key, _self));
    		}
		},
		
		_infoWindow: function(map, marker, data)
		{
			var info = $.trim(data.content);
			
			if(info != "")
			{
				var infowindow = new google.maps.InfoWindow({
					content: info
				});
				
				google.maps.event.addListener(marker, 'click', function() {
				    infowindow.open(map,marker);
				});
				
				if(data.tooltip_display) infowindow.open(map,marker);
			}
		}
		
    	
    }

    //simple wrapper to call the api. makes sure that the api data is not applied twice
    $.fn.aviaMaps = function( options )
    {
    	return this.each(function()
    	{	
    		var self = $.data( this, 'aviaMapsApi' );
    		
    		if(!self)
    		{
    			self = $.data( this, 'aviaMapsApi', new $.AviaMapsAPI( options, this ) );
    		}
    	});
    }
    
})( jQuery );

//this function is executed once the api file is loaded
window.aviaOnGoogleMapsLoaded = function(){ $('body').trigger('av-google-maps-api-loaded'); $.AviaMapsAPI.apiFiles.finished = true; };


// -------------------------------------------------------------------------------------------
// 
// AVIA VIDEO API - make sure that youtube, vimeo and html 5 use the same interface
// 
// requires froogaloop vimeo library and youtube iframe api (yt can be loaded async)
// 
// -------------------------------------------------------------------------------------------


(function($)
{
    "use strict";

	$.AviaVideoAPI  =  function(options, video, option_container)
	{	
		// actual video element. either iframe or video
		this.$video	= $( video );
		
		// container where the AviaVideoAPI object will be stored as data, and that can receive events like play, pause etc 
		// also the container that allows to overwrite javacript options by adding html data- attributes
		this.$option_container = option_container ? $( option_container ) : this.$video; 
		
		//mobile device?
		this.isMobile 	= $.avia_utilities.isMobile;
		
		//iamge fallback use
		this.fallback = this.isMobile ? this.$option_container.is('.av-mobile-fallback-image') : false;
		
		if(this.fallback) return;
		
		// set up the whole api object
		this._init( options );
		
	}

	$.AviaVideoAPI.defaults  = {
	
		loop: false,
		mute: false,
		controls: false,
		events: 'play pause mute unmute loop toggle reset unload'

	};
	
	$.AviaVideoAPI.apiFiles =
    {
    	youtube : {loaded: false, src: 'https://www.youtube.com/iframe_api' }
    }
	
  	$.AviaVideoAPI.prototype =
    {
    	_init: function( options )
    	{	
			// set slider options
			this.options = this._setOptions(options);
			
			// info which video service we are using: html5, vimeo or youtube
			this.type = this._getPlayerType();
			
			// store the player object to the this.player variable created by one of the APIs (mediaelement, youtube, vimeo)
			this._setPlayer();			
			
			// set to true once the events are bound so it doesnt happen a second time by accident or racing condition
			this.eventsBound = false;
			
			// info if the video is playing
			this.playing = false;
			
			//play pause indicator
			this.pp = $.avia_utilities.playpause(this.$option_container);
    	},
		
		
    	//set the video options by first merging the default options and the passed options, then checking the video element if any data attributes overwrite the option set
    	_setOptions: function(options)
		{	
			var newOptions 	= $.extend( true, {}, $.AviaVideoAPI.defaults, options ),
				htmlData 	= this.$option_container.data(),
				i 			= "";

			//overwritte passed option set with any data properties on the html element
			for (i in htmlData)
			{
				if (htmlData.hasOwnProperty(i) && (typeof htmlData[i] === "string" || typeof htmlData[i] === "number" || typeof htmlData[i] === "boolean"))
				{
					newOptions[i] = htmlData[i]; 
				}
			}
		
			return newOptions;
		},
		
		
		//get the player type
		_getPlayerType: function()
		{
			var vid_src = this.$video.get(0).src || this.$video.data('src');
			
			
			if(this.$video.is('video')) 				return 'html5';
			if(this.$video.is('.av_youtube_frame')) 	return 'youtube';
			if(vid_src.indexOf('vimeo.com') != -1 ) 	return 'vimeo';
			if(vid_src.indexOf('youtube.com') != -1) 	return 'youtube';
		},
		
		//get the player object
		_setPlayer: function()
		{
			var _self = this;
			
			switch(this.type)
			{
				case "html5": 	
				
					this.player = this.$video.data('mediaelementplayer');  
					this._playerReady(); 
					
				break; 
					
				case "vimeo": 	
					
					this.player = Froogaloop(this.$video.get(0)); 
					this._playerReady(); 
					
				break;
					
				case "youtube": 
				
					this._getAPI(this.type);
					$('body').on('av-youtube-iframe-api-loaded', function(){ _self._playerReady(); });
					
				break;
			}
		},
		
		_getAPI: function( api )
		{	
			//make sure the api file is loaded only once
			if($.AviaVideoAPI.apiFiles[api].loaded === false)
			{	
				$.AviaVideoAPI.apiFiles[api].loaded = true;
				//load the file async
				var tag		= document.createElement('script'),
					first	= document.getElementsByTagName('script')[0];
					
				tag.src = $.AviaVideoAPI.apiFiles[api].src;
      			first.parentNode.insertBefore(tag, first);
			}
		},
		
		
		
		//wait for player to be ready, then bind events
		_playerReady: function()
		{	
			var _self = this;
			
			this.$option_container.on('av-video-loaded', function(){ _self._bindEvents(); });
			
			switch(this.type)
			{
				case "html5": 
						
					this.$video.on('av-mediajs-loaded', function(){ _self.$option_container.trigger('av-video-loaded'); });
					this.$video.on('av-mediajs-ended' , function(){ _self.$option_container.trigger('av-video-ended');  });
					
				break;
				case "vimeo": 	
					
					//finish event must be applied after ready event for firefox
					_self.player.addEvent('ready',  function(){ _self.$option_container.trigger('av-video-loaded'); 
					_self.player.addEvent('finish', function(){ _self.$option_container.trigger('av-video-ended');  });
					}); 
					
					// vimeo sometimes does not fire. fallback jquery load event should fix this
					// currently not used because it causes firefox problems
					/*
					this.$video.load(function()
					{ 	
						if(_self.eventsBound == true || typeof _self.eventsBound == 'undefined') return;
				        _self.$option_container.trigger('av-video-loaded');
						$.avia_utilities.log('VIMEO Fallback Trigger');
				    });
					*/
					
				
				break;
				
				case "youtube": 
					
					var params = _self.$video.data();
					
					if(_self._supports_video()) params.html5 = 1;
					
					_self.player = new YT.Player(_self.$video.attr('id'), {
						videoId: params.videoid,
						height: _self.$video.attr('height'),
						width: _self.$video.attr('width'),
						playerVars: params,
						events: {
						'onReady': function(){ _self.$option_container.trigger('av-video-loaded'); },
						'onError': function(player){ $.avia_utilities.log('YOUTUBE ERROR:', 'error', player); },
						'onStateChange': function(event){ 
							if (event.data === YT.PlayerState.ENDED)
							{	
								var command = _self.options.loop != false ? 'loop' : 'av-video-ended';
								_self.$option_container.trigger(command); 
							} 
						  }
						}
					});
					
					
				break;
			}
			
			//fallback always trigger after 2 seconds
			setTimeout(function()
			{ 	
				if(_self.eventsBound == true || typeof _self.eventsBound == 'undefined' || _self.type == 'youtube' ) { return; }
				$.avia_utilities.log('Fallback Video Trigger "'+_self.type+'":', 'log', _self);
				
				_self.$option_container.trigger('av-video-loaded'); 
				
			},2000);
			
		},
		
		//bind events we should listen to, to the player
		_bindEvents: function()
		{	
			if(this.eventsBound == true || typeof this.eventsBound == 'undefined')
			{
				return;
			}
			
			var _self = this, volume = 'unmute';
			
			this.eventsBound = true;
			
			this.$option_container.on(this.options.events, function(e)
			{
				_self.api(e.type);
			});
			
			if(!_self.isMobile)
			{
				//set up initial options
				if(this.options.mute != false) { volume = "mute"; 	 }
				if(this.options.loop != false) { _self.api('loop'); }
				
				_self.api(volume);
			}
			
			//set timeout to prevent racing conditions with other scripts
			setTimeout(function()
			{
				_self.$option_container.trigger('av-video-events-bound').addClass('av-video-events-bound');
			},50);
		},
		
		
		_supports_video: function() {
		  return !!document.createElement('video').canPlayType;
		},
		
		
		/************************************************************************
		PUBLIC Methods
		*************************************************************************/
		
		api: function( action )
		{	
			//commands on mobile can not be executed if the player was not started manually 
			if(this.isMobile && !this.was_started()) return;
			
			// prevent calling of unbound function
			if(this.options.events.indexOf(action) === -1) return;
			
			// broadcast that the command was executed
			this.$option_container.trigger('av-video-'+action+'-executed');
			
			// calls the function based on action. eg: _html5_play()
			if(typeof this[ '_' + this.type + '_' + action] == 'function')
			{
				this[ '_' + this.type + '_' + action].call(this);
			}
			
			//call generic function eg: _toggle() or _play()
			if(typeof this[ '_' + action] == 'function')
			{
				this[ '_' + action].call(this);
			}
			
		},
		
		was_started: function()
		{
			if(!this.player) return false;
		
			switch(this.type)
			{
				case "html5": 
					if(this.player.getCurrentTime() > 0) return true; 
				break; 
					
				case "vimeo": 	
					if(this.player.api('getCurrentTime') > 0) return true; 
				break;
					
				case "youtube": 
					if(this.player.getPlayerState() !== -1) return true; 
				break;
			}
			
			return false;
		},
		
		/************************************************************************
		Generic Methods, are always executed and usually set variables
		*************************************************************************/
		_play: function()
		{
			this.playing = true; 
		},
		
		_pause: function()
		{
			this.playing = false; 
		},
		
		_loop: function()
		{
			this.options.loop = true;
		},
		
		_toggle: function( )
		{
			var command = this.playing == true ? 'pause' : 'play';
			
			this.api(command);
			this.pp.set(command);
		},
		
		
		/************************************************************************
		VIMEO Methods
		*************************************************************************/
		
		_vimeo_play: function( )
		{	
			this.player.api('play');
		},
		
		_vimeo_pause: function( )
		{
			this.player.api('pause');	
		},
		
		_vimeo_mute: function( )
		{
			this.player.api('setVolume', 0);
		},
		
		_vimeo_unmute: function( )
		{
			this.player.api('setVolume', 0.7);
		},
		
		_vimeo_loop: function( )
		{
			// currently throws error, must be set in iframe
			// this.player.api('setLoop', true);
		},
		
		_vimeo_reset: function( )
		{
			this.player.api('seekTo',0);
		},
		
		_vimeo_unload: function()
		{
			this.player.api('unload');
		},
		
		/************************************************************************
		YOUTUBE Methods
		*************************************************************************/		
		
		_youtube_play: function( )
		{
			this.player.playVideo();
		},
		
		_youtube_pause: function( )
		{
			this.player.pauseVideo()
		},
		
		_youtube_mute: function( )
		{
			this.player.mute();
		},
		
		_youtube_unmute: function( )
		{
			this.player.unMute();
		},
		
		_youtube_loop: function( )
		{	
			// does not work properly with iframe api. needs to manual loop on "end" event
			// this.player.setLoop(true); 
			if(this.playing == true) this.player.seekTo(0);
		},
		
		_youtube_reset: function( )
		{
			this.player.stopVideo();
		},
		
		_youtube_unload: function()
		{
			this.player.clearVideo();
		},
		
		/************************************************************************
		HTML5 Methods
		*************************************************************************/
		
		_html5_play: function( )
		{
			//disable stoping of other videos in case the user wants to run section bgs
			this.player.options.pauseOtherPlayers = false;
			this.player.play();
		},
		
		_html5_pause: function( )
		{
			this.player.pause();
		},
		
		_html5_mute: function( )
		{
			this.player.setMuted(true);
		},
		
		_html5_unmute: function( )
		{
			this.player.setVolume(0.7);
		},
		
		_html5_loop: function( )
		{
			this.player.options.loop = true;
		},
		
		_html5_reset: function( )
		{	
			this.player.setCurrentTime(0);	
		},
		
		_html5_unload: function()
		{
			this._html5_pause();
			this._html5_reset();
		}
    }

    //simple wrapper to call the api. makes sure that the api data is not applied twice
    $.fn.aviaVideoApi = function( options , apply_to_parent)
    {
    	return this.each(function()
    	{	
    		// by default save the object as data to the initial video. 
    		// in the case of slideshows its more benefitial to save it to a parent element (eg: the slide)
    		var applyTo = this;
    		
    		if(apply_to_parent)
    		{
    			applyTo = $(this).parents(apply_to_parent).get(0);
    		}
    		
    		var self = $.data( applyTo, 'aviaVideoApi' );
    		
    		if(!self)
    		{
    			self = $.data( applyTo, 'aviaVideoApi', new $.AviaVideoAPI( options, this, applyTo ) );
    		}
    	});
    }
    
})( jQuery );

window.onYouTubeIframeAPIReady = function(){ $('body').trigger('av-youtube-iframe-api-loaded'); };



// -------------------------------------------------------------------------------------------
// Masonry
// -------------------------------------------------------------------------------------------

$.fn.avia_masonry = function(options)
{
	//return if we didnt find anything
	if(!this.length) return this;
	
	var the_body = $('body'),
		isMobile = $.avia_utilities.isMobile,
		loading = false,
		methods = {
	
		masonry_filter: function()
		{
			var current		= $(this),
				linktext	= current.html(),
		  		selector	= current.data('filter'),
		  		masonry 	= current.parents('.av-masonry:eq(0)'),
		  		container 	= masonry.find('.av-masonry-container:eq(0)'),
		  		links		= masonry.find('.av-masonry-sort a'),
		  		activeCat	= masonry.find('.av-current-sort-title');
				
				links.removeClass('active_sort');
				current.addClass('active_sort');
				container.attr('id', 'masonry_id_'+selector);
				
				if(activeCat.length) activeCat.html(linktext);
				
				methods.applyMasonry(container, selector, function()
				{
					container.css({overflow:'visible'});
				});
				
				return false;
		},
		
		applyMasonry: function(container, selector, callback)
		{
			var filters = selector ? {filter: '.'+selector} : {};
			
			container.isotope(filters, function()
			{
				$(window).trigger('av-height-change');
			});
			
			if(typeof callback == 'function')
			{
				setTimeout(callback, 0);
			}
		},
		
		show_bricks: function(bricks, callback)
		{
			bricks.each(function(i)
			{
				var currentLink 	= $(this),
					browserPrefix 	= $.avia_utilities.supports('transition'),
					multiplier		= isMobile ? 0 : 100;
				
				setTimeout(function()
				{
					if(browserPrefix === false)
					{
						currentLink.css({visibility:"visible", opacity:0}).animate({opacity:1},1500);
					}
					else
					{
						currentLink.addClass('av-masonry-item-loaded');
					}
					
					if(i == bricks.length - 1 && typeof callback == 'function')
					{
						callback.call();
						$(window).trigger('av-height-change');
					}
					
				}, (multiplier * i));
			});
		},
		
		loadMore: function(e)
		{
			e.preventDefault();
			
			if(loading) return false;
			
			loading = true;
		
			var current		= $(this),
		  		data		= current.data(),
		  		masonry 	= current.parents('.av-masonry:eq(0)'),
		  		container	= masonry.find('.av-masonry-container'),
		  		loader		= $.avia_utilities.loading(),
		  		finished	= function(){ loading = false; loader.hide(); the_body.trigger('av_resize_finished'); };
		  	
		  	//calculate a new offset	
		  	if(!data.offset){ data.offset = 0; }	
		  	data.offset += data.items;
		  	data.action = 'avia_ajax_masonry_more';
		  	
		  	 $.ajax({
				url: avia_framework_globals.ajaxurl,
				type: "POST",
				data:data,
				beforeSend: function()
				{
					loader.show();
				},
				success: function(response)
				{
					if(response.indexOf("{av-masonry-loaded}") !== -1)
					{
						//fetch the response. if any php warnings were displayed before rendering of the items the are removed by the string split
						var response  = response.split('{av-masonry-loaded}'),
							new_items = $(response.pop()).filter('.isotope-item');
							
							//check if we got more items than we need. if not we have reached the end of items
							if(new_items.length > data.items)
							{
								new_items = new_items.not(':last');
							}
							else
							{
								current.addClass('av-masonry-no-more-items');
							}
							
							var load_container = $('<div class="loadcontainer"></div>').append(new_items);
							
							
							
							$.avia_utilities.preload({container: load_container, single_callback:  function()
							{
								var links = masonry.find('.av-masonry-sort a'),
									    filter_container = masonry.find('.av-sort-by-term');
								
								filter_container.hide();
								
								loader.hide();
								container.isotope( 'insert', new_items); 
								$.avia_utilities.avia_ajax_call(container);
								setTimeout( function(){ methods.show_bricks( new_items , finished); },150);

								if(links)
								{
									$(links).each(function(filterlinkindex){
										var filterlink = $(this),
										sort = filterlink.data('filter');

										if(new_items)
										{
										    $(new_items).each(function(itemindex){
										        var item = $(this);
										
										        if(item.hasClass(sort))
										        {
										            var term_count = filterlink.find('.avia-term-count').text();
										            filterlink.find('.avia-term-count').text(' ' + (parseInt(term_count) + 1) + ' ');
										
										            if(filterlink.hasClass('avia_hide_sort'))
										            {
										                filterlink.removeClass('avia_hide_sort').addClass('avia_show_sort');
										                masonry.find('.av-masonry-sort .'+sort+'_sep').removeClass('avia_hide_sort').addClass('avia_show_sort');
										                masonry.find('.av-masonry-sort .av-sort-by-term').removeClass('hidden');
										            }
										        }
										    });
										}
									});

								}

                                				filter_container.fadeIn();
							}
						});
					}
					else
					{
						finished();
					}
				},
				error: finished,
				complete: function()
				{
				    
				}
			});
		}

	};

	return this.each(function()
	{	
		var masonry			= $(this),
			container 		= masonry.find('.av-masonry-container'),
			bricks			= masonry.find('.isotope-item'), 
			filter			= masonry.find('.av-masonry-sort').css({visibility:"visible", opacity:0}).on('click', 'a',  methods.masonry_filter),
			load_more		= masonry.find('.av-masonry-load-more').css({visibility:"visible", opacity:0});
			
		$.avia_utilities.preload({container: container, single_callback:  function()
		{
			var start_animation = function()
			{ 
				filter.animate({opacity:1}, 400);
				
				//fix for non aligned elements because of scrollbar
				if(container.outerHeight() + container.offset().top + $('#footer').outerHeight() > $(window).height())
				{
					$('html').css({'overflow-y':'scroll'});
				}
				
				methods.applyMasonry(container, false, function()
				{
					masonry.addClass('avia_sortable_active');
					container.removeClass('av-js-disabled '); 
				});
				
				methods.show_bricks(bricks, function()
				{
					load_more.css({opacity:1}).on('click',  methods.loadMore);
				});
				
				//container.isotope( 'reLayout' );

			};
			
			if(isMobile)
			{
				start_animation();
			}
			else
			{
				masonry.waypoint(start_animation , { offset: '80%'} );
			}
					
			// update columnWidth on window resize
			$(window).on( 'debouncedresize', function()
			{
			  	methods.applyMasonry(container, false, function()
				{
					masonry.addClass('avia_sortable_active');
				});
			});
		}
	});
		
		
	});
};




	
// -------------------------------------------------------------------------------------------
// Avia AJAX Portfolio
// -------------------------------------------------------------------------------------------

(function($)
{ 
	"use strict";
	$.avia_utilities = $.avia_utilities || {};
	
	$.fn.avia_portfolio_preview = function(passed_options) 
	{	
		var win  = $(window),
		the_body = $('body'),
		isMobile = $.avia_utilities.isMobile,
		defaults = 
		{
			open_in:	'.portfolio-details-inner',
			easing:		'easeOutQuint',
			timing:		800,
			transition:	'slide' // 'fade' or 'slide'
		},
		
		options = $.extend({}, defaults, passed_options);
	
		return this.each(function()
		{	
			var container			= $(this),
				portfolio_id		= container.data('portfolio-id'),
				target_wrap			= $('.portfolio_preview_container[data-portfolio-id="' + portfolio_id + '"]'),
				target_container	= target_wrap.find(options.open_in),
				items				= container.find('.grid-entry'),
				content_retrieved	= {},
				is_open				= false,
				animating			= false,
				index_open			= false,
				ajax_call			= false,
				methods,
				controls,
				loader				= $.avia_utilities.loading();
				
			methods = 
			{
				load_item: function(e)
				{
					e.preventDefault();

					var link			= $(this),
						post_container	= link.parents('.post-entry:eq(0)'),
						post_id			= "ID_" + post_container.data('ajax-id'),
						clickedIndex	= items.index(post_container);
					
					//check if current item is the clicked item or if we are currently animating
					if(post_id === is_open || animating == true) 
					{
						return false;
					}
					
					animating = true;
					
					container.find('.active_portfolio_item').removeClass('active_portfolio_item');
					post_container.addClass('active_portfolio_item');
					loader.show();
					
					methods.ajax_get_contents(post_id, clickedIndex);
				},
				
				scroll_top: function()
				{
					setTimeout(function()
					{
						var target_offset = target_wrap.offset().top - 175,
							window_offset = win.scrollTop();
											
						if(window_offset > target_offset || target_offset - window_offset > 100  )
						{
							$('html:not(:animated),body:not(:animated)').animate({ scrollTop: target_offset }, options.timing, options.easing);
						}
					},10);
				},
				
				attach_item: function(post_id)
				{
					content_retrieved[post_id] = $(content_retrieved[post_id]).appendTo(target_container);
					ajax_call = true;
				},
				
				remove_video: function()
				{
					var del = target_wrap.find('iframe, .avia-video').parents('.ajax_slide:not(.open_slide)');	
					
						if(del.length > 0)
						{
							del.remove();
							content_retrieved["ID_" + del.data('slideId')] = undefined;
						}
				},
				
				show_item: function(post_id, clickedIndex)
				{
				
					//check if current item is the clicked item or if we are currently animating
					if(post_id === is_open) 
					{
						return false;
					}
					animating = true;
					
					
					loader.hide();
					
					if(false === is_open)
					{
						target_wrap.addClass('open_container');
						content_retrieved[post_id].addClass('open_slide');
						
						methods.scroll_top();
						
						target_wrap.css({display:'none'}).slideDown(options.timing, options.easing, function()
						{
							if(ajax_call)
							{ 
								activate_shortcode_scripts(content_retrieved[post_id]); 
								$.avia_utilities.avia_ajax_call(content_retrieved[post_id]);
								the_body.trigger('av_resize_finished');
								ajax_call = false; 
							}
							
							methods.remove_video();
							the_body.trigger('av_resize_finished');
						});
						
							index_open	= clickedIndex;
							is_open		= post_id;
							animating	= false;
						
						
						
					}
					else
					{
						methods.scroll_top();
					
						var initCSS = { zIndex:3 },
							easing	= options.easing;
							
						if(index_open > clickedIndex) { initCSS.left = '-110%'; }
						if(options.transition === 'fade'){ initCSS.left = '0%'; initCSS.opacity = 0; easing = 'easeOutQuad'; }
						
						//fixate height for container during animation
						target_container.height(target_container.height()); //outerHeight = border problems?
						
						content_retrieved[post_id].css(initCSS).avia_animate({'left':"0%", opacity:1}, options.timing, easing);
						content_retrieved[is_open].avia_animate({opacity:0}, options.timing, easing, function()
						{
							content_retrieved[is_open].attr({'style':""}).removeClass('open_slide');
							content_retrieved[post_id].addClass('open_slide');
																										  //+ 2 fixes border problem (slides move up and down 2 px on transition)
							target_container.avia_animate({height: content_retrieved[post_id].outerHeight() + 2}, options.timing/2, options.easing, function()
							{
								target_container.attr({'style':""});
								is_open		= post_id;
								index_open	= clickedIndex;
								animating	= false;
								
								methods.remove_video();
								if(ajax_call)
								{ 
									the_body.trigger('av_resize_finished');
									activate_shortcode_scripts(content_retrieved[post_id]); 
									$.avia_utilities.avia_ajax_call(content_retrieved[post_id]);
									ajax_call = false; 
								}
	
							});
							
						});		
					}
				},
				
				ajax_get_contents: function(post_id, clickedIndex)
				{
					if(content_retrieved[post_id] !== undefined)
					{
						methods.show_item(post_id, clickedIndex);
						return;
					}
					
					content_retrieved[post_id] = $('#avia-tmpl-portfolio-preview-' + post_id.replace(/ID_/,"")).html();
					
					//this line is necessary to prevent w3 total cache from messing up the portfolio if inline js is compressed
					content_retrieved[post_id] = content_retrieved[post_id].replace('/*<![CDATA[*/','').replace('*]]>','');
					
					methods.attach_item(post_id);
					
					$.avia_utilities.preload({container: content_retrieved[post_id] , single_callback:  function(){ methods.show_item(post_id, clickedIndex); }});
				},
				
				add_controls: function()
				{
					controls = target_wrap.find('.ajax_controlls');

					target_wrap.avia_keyboard_controls({27:'.avia_close', 37:'.ajax_previous', 39:'.ajax_next'});
					//target_wrap.avia_swipe_trigger({prev:'.ajax_previous', next:'.ajax_next'});
					
					items.each(function(){
					
						var current = $(this), overlay;
						
						current.addClass('no_combo').bind('click', function(event)
						{
							overlay = current.find('.slideshow_overlay');
							
							if(overlay.length)
							{
								event.stopPropagation();
								methods.load_item.apply(current.find('a:eq(0)'));
								return false;
							}
						});
						
						
					});
				},
				
				control_click: function()
				{
					var showItem,
						activeID = container.find('.active_portfolio_item').data('ajax-id'),
						active   = container.find('.post-entry-'+activeID);
				
					switch(this.hash)
					{
						case '#next': 
						
							showItem = active.nextAll('.post-entry:visible:eq(0)').find('a:eq(0)');
							if(!showItem.length) { showItem = $('.post-entry:visible:eq(0)', container).find('a:eq(0)'); }
							showItem.trigger('click');
					
						break;
						case '#prev': 
							
							showItem = active.prevAll('.post-entry:visible:eq(0)').find('a:eq(0)');
							if(!showItem.length) { showItem = $('.post-entry:visible:last', container).find('a:eq(0)'); }
							showItem.trigger('click');
						
						break;
						case '#close':
						
							animating = true;
							
							target_wrap.slideUp( options.timing, options.easing, function()
							{ 
								container.find('.active_portfolio_item').removeClass('active_portfolio_item');
								content_retrieved[is_open].attr({'style':""}).removeClass('open_slide');
								target_wrap.removeClass('open_container');
								animating = is_open = index_open = false;
								methods.remove_video();
								the_body.trigger('av_resize_finished');
							});
							
						break;
					}
					return false;
				},
				
				
				resize_reset: function()
				{
					if(is_open === false)
					{
						target_container.html('');
						content_retrieved	= [];
					}
				}
			};
			
			methods.add_controls();
			
			container.on("click", "a", methods.load_item);
			controls.on("click", "a", methods.control_click);
			if(jQuery.support.leadingWhitespace) { win.bind('debouncedresize', methods.resize_reset); }
			
		});
	};
}(jQuery));	



// -------------------------------------------------------------------------------------------
// Fullscreen Slideshow 
// 
// extends avia slideshow script with a more sophisticated preloader and fixed size for slider
// -------------------------------------------------------------------------------------------


	$.AviaFullscreenSlider  =  function(options, slider)
	{
	    this.$slider  	= $( slider );
	    this.$inner	  	= this.$slider.find('.avia-slideshow-inner');
	    this.$caption 	= this.$inner.find('.avia-slide-wrap .caption_container');
	    this.$win	  	= $( window );
	    this.isMobile 	= $.avia_utilities.isMobile;
	    this.property 	= {};
	    this.scrollPos	= "0";
	    this.transform3d= document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
	    
	    if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}
		
	    this._init( options );
	}

	$.AviaFullscreenSlider.defaults  = {

		//height of the slider in percent
		height: 100,
		
		//subtract elements from the height
		subtract: '#wpadminbar, #header, #main>.title_container'
		
		
	};

  	$.AviaFullscreenSlider.prototype =
    {
    	_init: function( options )
    	{
    		var _self = this;
    		//set the default options
    		this.options = $.extend( true, {}, $.AviaFullscreenSlider.defaults, options );
    		
    		if(this.$slider.data('slide_height')) this.options.height = this.$slider.data('slide_height');
    		
    		//elements that get subtracted from the image height
    		this.$subtract = $(this.options.subtract);
    		
    		
			// set the slideshow size
			this._setSize(); 
    		
			// set resizing script on window resize
			this.$win.on( 'debouncedresize',  $.proxy( this._setSize, this) );
    		
    		//parallax scroll if element if leaving viewport
			setTimeout(function()
			{
				if(!_self.isMobile) //disable parallax scrolling on mobile
    			_self.$win.on( 'scroll',  function(){ window.requestAnimationFrame( $.proxy( _self._parallax_scroll, _self) )} );
    			
    		},100);
			/**/
    		
			//activate the defaule slider
			this.$slider.aviaSlider({bg_slider:true});
			
			
    	},
    	
    	_fetch_properties: function(slide_height)
		{
			this.property.offset 	= this.$slider.offset().top;
			this.property.wh 		= this.$win.height();
			this.property.height 	= slide_height || this.$slider.outerHeight();
			
			//re-position the slider
			this._parallax_scroll();
		},
    	
    	_setSize: function( )
    	{	
    		if(!$.fn.avia_browser_height)
    		{
    	
    		var viewport		= this.$win.height(),
    			slide_height	= Math.ceil( (viewport / 100) * this.options.height );
			
			if(this.$subtract.length && this.options.height == 100)
			{
	    		this.$subtract.each(function()
	    		{
	    			slide_height -= this.offsetHeight - 0.5;
	    		});
    		}
    		else
    		{
    			slide_height -= 1;
    		}
    		this.$slider.height(slide_height);
    		this.$inner.css('padding',0);
    		}
    		
    		
    		this._fetch_properties(slide_height);
    		
    	},
    	
    	_parallax_scroll: function(e)
    	{
    		if(this.isMobile) return; //disable parallax scrolling on mobile
    	
    		var winTop 		= this.$win.scrollTop(),
    			winBottom	=  winTop + this.property.wh,
    			scrollPos 	= "0", 
    			prop 		= {}, prop2 = {};
    		
    		if(this.property.offset < winTop && winTop <= this.property.offset + this.property.height)
    		{	
    			scrollPos = Math.round( (winTop - this.property.offset) * 0.7 );
    		}
    		
    		if(this.scrollPos != scrollPos)
    		{	
    			//slide background parallax
    			this.scrollPos = scrollPos;
    			if(this.transform3d)
    			{
    				prop[$.avia_utilities.supported.transition+"transform"] = "translate3d(0px,"+ scrollPos +"px,0px)";
    			}
    			else
    			{
    				prop[$.avia_utilities.supported.transition+"transform"] = "translate(0px,"+ scrollPos +"px)";
    			}
    			
    			this.$inner.css(prop);
    			
    			//slider caption parallax
    			
				// prop2[$.avia_utilities.supported.transition+"transform"] = "translate(0px,-"+ ( scrollPos * 1) +"px)";
				/*
	    		prop2['opacity'] = Math.ceil((this.$slider.height() - (scrollPos * 2)) / 100)/ 10;
	    		prop2['opacity'] = prop2['opacity'] < 0 ? 0 : prop2['opacity'];
	    		this.$caption.css(prop2);
				*/
    		}
    	}
    };



$.fn.aviaFullscreenSlider = function( options )
{
	return this.each(function()
	{
		var active = $.data( this, 'aviaFullscreenSlider' );

		if(!active)
		{
			//make sure that the function doesnt get aplied a second time
			$.data( this, 'aviaFullscreenSlider', 1 );
			
			//create the preparations for fullscreen slider
			new $.AviaFullscreenSlider( options, this );
		}
	});
}
	
// -------------------------------------------------------------------------------------------
// makes sure that the fixed container height is removed once the layerslider is loaded, so it adapts to the screen resolution
// -------------------------------------------------------------------------------------------

	$.AviaParallaxElement  =  function(options, element)
	{
	    this.$el  	  	= $( element ).addClass('active-parallax');
	    this.$win	  	= $( window );
	    this.$body	  	= $( 'body' );
	    this.$parent  	= this.$el.parent();
	    this.property	= {};
	    this.isMobile 	= $.avia_utilities.isMobile;
	    this.ratio		= this.$el.data('avia-parallax-ratio') || 0.5;
	    this.transform  = document.documentElement.className.indexOf('avia_transform') !== -1 ? true : false;
	    this.transform3d= document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
	    
	    if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}
	    
	    this._init( options );
	}
	
	$.AviaParallaxElement.prototype = {
	
		_init: function( options )
    	{
    		var _self = this;
			if(_self.isMobile)
			{
				return; //disable parallax scrolling on mobile
			}
			
			
			
			//fetch window constants
			setTimeout(function()
			{
    			_self._fetch_properties();
    		},30);
			
			this.$win.on("debouncedresize av-height-change",  $.proxy( _self._fetch_properties, _self));
			this.$body.on("av_resize_finished",  $.proxy( _self._fetch_properties, _self));
			
			
			
			//activate the scrolling
			setTimeout(function()
			{
    			_self.$win.on( 'scroll',  function(){ window.requestAnimationFrame( $.proxy( _self._parallax_scroll, _self) )} );
    			
    		},100);
		},
		
		_fetch_properties: function()
		{
			this.property.offset 	= this.$parent.offset().top;
			this.property.wh 		= this.$win.height();
			this.property.height 	= this.$parent.outerHeight();
			
			//set the height of the element based on the windows height, offset ratio and parent height
			this.$el.height(Math.ceil((this.property.wh * this.ratio) + this.property.height));
			
			//re-position the element
			this._parallax_scroll();
		},
		
		_parallax_scroll: function(e)
    	{
    		var winTop		=  this.$win.scrollTop(),
    			winBottom	=  winTop + this.property.wh,
    			scrollPos 	= "0", 
    			prop = {};
    		
    		//shift element when it moves into viewport
    		if(this.property.offset < winBottom && winTop <= this.property.offset + this.property.height)
    		{	
    			scrollPos = Math.round( (winBottom - this.property.offset) * this.ratio );
    			
    			//parallax movement via backround position change, although
    			if(this.transform3d)
    			{
    				prop[$.avia_utilities.supported.transition+"transform"] = "translate3d(0px,"+ scrollPos +"px, 0px)";
    			}
    			else if(this.transform)
    			{
    				prop[$.avia_utilities.supported.transition+"transform"] = "translate(0px,"+ scrollPos +"px)";
    			}
    			else
    			{
    				prop["background-position"] = "0px "+ scrollPos +"px";
    			}
	    		
	    		this.$el.css(prop);
    		}
    	}
	};


$.fn.avia_parallax = function(options)
{
	
	return this.each(function()
    	{
    		var self = $.data( this, 'aviaParallax' );

    		if(!self)
    		{
    			self = $.data( this, 'aviaParallax', new $.AviaParallaxElement( options, this ) );
    		}
    	});
}


// -------------------------------------------------------------------------------------------
// Helper to allow fixed bgs on mobile
// -------------------------------------------------------------------------------------------

$.fn.avia_mobile_fixed = function(options)
{
	var isMobile = $.avia_utilities.isMobile;
	if(!isMobile) return;
	
	return this.each(function()
	{
		var current				= $(this).addClass('av-parallax-section'),
			$background 		= current.attr('style'),
			$attachment_class 	= current.data('section-bg-repeat'),
			template			= "";
			
			if($attachment_class == 'stretch' || $attachment_class == 'no-repeat' )
			{
				$attachment_class = " avia-full-stretch"; 
			}
			else
			{
				$attachment_class = ""; 
			}
			
			template = "<div class='av-parallax " + $attachment_class + "' data-avia-parallax-ratio='0.0' style = '" + $background + "' ></div>";
			
			current.prepend(template);
			current.attr('style','');
	});
}




	
// -------------------------------------------------------------------------------------------
// makes sure that the fixed container height is removed once the layerslider is loaded, so it adapts to the screen resolution
// -------------------------------------------------------------------------------------------

$.fn.layer_slider_height_helper = function(options)
{
	return this.each(function()
	{
		var container 	= $(this),
			first_div 	= container.find('>div:first'),
			timeout 	= false,
			counter 	= 0,
			reset_size 	= function()
			{
				if(first_div.height() > 0 || counter > 5)
				{
					container.height('auto');
				}
				else
				{
					timeout = setTimeout(reset_size, 500);
					counter++;
				}
			};

		if(!first_div.length) return;

		timeout = setTimeout(reset_size, 0);
	});
}

// -------------------------------------------------------------------------------------------
// testimonial shortcode javascript
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_testimonial = function(options)
{
	return this.each(function()
	{
		var container = $(this), elements = container.find('.avia-testimonial');


		//trigger displaying of thumbnails
		container.on('avia_start_animation', function()
		{
			elements.each(function(i)
			{
				var element = $(this);
				setTimeout(function(){ element.addClass('avia_start_animation') }, (i * 150));
			});
		});
	});
}


// -------------------------------------------------------------------------------------------
// Progress bar shortcode javascript
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_progressbar = function(options)
{
	return this.each(function()
	{
		var container = $(this), elements = container.find('.progress');


		//trigger displaying of thumbnails
		container.on('avia_start_animation', function()
		{
			elements.each(function(i)
			{
				var element = $(this);
				setTimeout(function(){ element.addClass('avia_start_animation') }, (i * 250));
			});
		});
	});
}

// -------------------------------------------------------------------------------------------
// Iconlist shortcode javascript
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_iconlist = function(options)
{
	return this.each(function()
	{
		var iconlist = $(this), elements = iconlist.find('>li');


		//trigger displaying of thumbnails
		iconlist.on('avia_start_animation', function()
		{
			elements.each(function(i)
			{
				var element = $(this);
				setTimeout(function(){ element.addClass('avia_start_animation') }, (i * 350));
			});
		});
	});
}


// -------------------------------------------------------------------------------------------
//  shortcode javascript for delayed animation even when non connected elements are used
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_animation_delayed = function(options)
{
	var global_timer = 0,
		delay = options.delay || 50;

	return this.each(function()
	{
		var elements = $(this);

		//trigger displaying of thumbnails
		elements.on('avia_start_animation', function()
		{
			var element = $(this);
			global_timer ++;
			setTimeout(function(){ element.addClass('avia_start_delayed_animation'); global_timer --; }, (global_timer * delay));
		});
	});
}


// -------------------------------------------------------------------------------------------
// Section Height Helper
// -------------------------------------------------------------------------------------------

$.fn.avia_browser_height = function()
{
	if(!this.length) return;
	
	var win			= $(window),
		html_el		= $('html'),
		subtract	= $('#wpadminbar, #header.av_header_top:not(.html_header_transparency #header), #main>.title_container'),
		css_block	= $("<style type='text/css' id='av-browser-height'></style>").appendTo('head:first'), 
		sidebar_menu= $('.html_header_sidebar #top #header_main'),
		full_slider	= $('.html_header_sidebar .avia-fullscreen-slider.avia-builder-el-0.avia-builder-el-no-sibling').addClass('av-solo-full'),
		calc_height = function()
		{
			var css			= "",
				wh100 		= win.height(),
				ww100 		= win.width(),
				wh100_mod 	= wh100,
				whCover		= (wh100 / 9) * 16,
				wwCover		= (ww100 / 16) * 9,
				wh75		= Math.round( wh100 * 0.75 ),
				wh50		= Math.round( wh100 * 0.5  ),
				wh25		= Math.round( wh100 * 0.25 ),
				solo		= 0;
			
			if(sidebar_menu.length) solo = sidebar_menu.height();
			
			subtract.each(function(){ wh100_mod -= this.offsetHeight - 1; });	
			
			var whCoverMod	= (wh100_mod / 9) * 16;
			
			//fade in of section content with minimum height once the height has been calculated
			css += ".avia-section.av-minimum-height .container{opacity: 1; }\n";
			
			//various section heights (100-25% as well as 100% - header/adminbar in case its the first builder element)
			css += ".av-minimum-height-100 .container, .avia-fullscreen-slider .avia-slideshow, #top.avia-blank .av-minimum-height-100 .container{height:"+wh100+"px;}\n";
			css += ".av-minimum-height-75 .container	{height:"+wh75+"px;}\n";
			css += ".av-minimum-height-50 .container {height:"+wh50+"px;}\n";
			css += ".av-minimum-height-25 .container {height:"+wh25+"px;}\n";
			css += ".avia-builder-el-0.av-minimum-height-100 .container, .avia-builder-el-0.avia-fullscreen-slider .avia-slideshow{height:"+wh100_mod+"px;}\n";
			
			css += "#top .av-solo-full .avia-slideshow {min-height:"+solo+"px;}\n";
			
			//fullscreen video calculations
			if(ww100/wh100 < 16/9)
			{
				css += "#top .av-element-cover iframe, #top .av-element-cover embed, #top .av-element-cover object, #top .av-element-cover video{width:"+whCover+"px; left: -"+(whCover - ww100)/2+"px;}\n";
			}
			else
			{
				css += "#top .av-element-cover iframe, #top .av-element-cover embed, #top .av-element-cover object, #top .av-element-cover video{height:"+wwCover+"px; top: -"+(wwCover - wh100)/2+"px;}\n";
			}
			
			if(ww100/wh100_mod < 16/9)
			{
				css += "#top .avia-builder-el-0 .av-element-cover iframe, #top .avia-builder-el-0 .av-element-cover embed, #top .avia-builder-el-0 .av-element-cover object, #top .avia-builder-el-0 .av-element-cover video{width:"+whCoverMod+"px; left: -"+(whCoverMod - ww100)/2+"px;}\n";
			}
			else
			{
				css += "#top .avia-builder-el-0 .av-element-cover iframe, #top .avia-builder-el-0 .av-element-cover embed, #top .avia-builder-el-0 .av-element-cover object, #top .avia-builder-el-0 .av-element-cover video{height:"+wwCover+"px; top: -"+(wwCover - wh100_mod)/2+"px;}\n";
			}
			
			//ie8 needs different insert method
			try{
				css_block.text(css); 
			}
			catch(err){
				css_block.remove();
				css_block = $("<style type='text/css' id='av-browser-height'>"+css+"</style>").appendTo('head:first');
			}
			
			
			setTimeout(function(){ win.trigger('av-height-change'); /*broadcast the height change*/ },100);
		};
	
	win.on( 'debouncedresize', calc_height);
	calc_height();
}

// -------------------------------------------------------------------------------------------
// Video Section helper
// -------------------------------------------------------------------------------------------

$.fn.avia_video_section = function()
{
	if(!this.length) return;
	
	var elements	= this.length, content = "",
		win			= $(window),
		css_block	= $("<style type='text/css' id='av-section-height'></style>").appendTo('head:first'), 
		calc_height = function(section, counter)
		{
			if(counter === 0) { content = "";}
		
			var css			= "",
				the_id		= '#' +section.attr('id'),
				wh100 		= section.height(),
				ww100 		= section.width(),
				aspect		= section.data('sectionVideoRatio').split(':'),
				video_w		= aspect[0],
				video_h		= aspect[1],
				whCover		= (wh100 / video_h ) * video_w,
				wwCover		= (ww100 / video_w ) * video_h;
			
			//fullscreen video calculations
			if(ww100/wh100 < video_w/video_h)
			{
				css += "#top "+the_id+" .av-section-video-bg iframe, #top "+the_id+" .av-section-video-bg embed, #top "+the_id+" .av-section-video-bg object, #top "+the_id+" .av-section-video-bg video{width:"+whCover+"px; left: -"+(whCover - ww100)/2+"px;}\n";
			}
			else
			{
				css += "#top "+the_id+" .av-section-video-bg iframe, #top "+the_id+" .av-section-video-bg embed, #top "+the_id+" .av-section-video-bg object, #top "+the_id+" .av-section-video-bg video{height:"+wwCover+"px; top: -"+(wwCover - wh100)/2+"px;}\n";
			}
			
			content = content + css;
			
			if(elements == counter + 1)
			{
				//ie8 needs different insert method
				try{
					css_block.text(content);
				}
				catch(err){
					css_block.remove();
					css_block = $("<style type='text/css' id='av-section-height'>"+content+"</style>").appendTo('head:first');
				}
			}
		};
		
		
	return this.each(function(i)
	{
		var self = $(this);
		
		win.on( 'debouncedresize', function(){ calc_height(self, i); });
		calc_height(self, i);
	});
	
}



// -------------------------------------------------------------------------------------------
// Gallery shortcode javascript
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_gallery = function(options)
{
	return this.each(function()
	{
		var gallery = $(this), images = gallery.find('img'), big_prev = gallery.find('.avia-gallery-big');


		//trigger displaying of thumbnails
		gallery.on('avia_start_animation', function()
		{
			images.each(function(i)
			{
				var image = $(this);
				setTimeout(function(){ image.addClass('avia_start_animation') }, (i * 110));
			});
		});
		
		if(gallery.hasClass('deactivate_avia_lazyload')) gallery.trigger('avia_start_animation');

		//trigger thumbnail hover and big prev image change
		if(big_prev.length)
		{
			gallery.on('mouseenter','.avia-gallery-thumb a', function()
			{
				var _self = this;

				big_prev.attr('data-onclick', _self.getAttribute("data-onclick"));
				big_prev.height(big_prev.height());
				big_prev.attr('href', _self.href)

				var newImg 		= _self.getAttribute("data-prev-img"),
					oldImg 		= big_prev.find('img'),
					oldImgSrc 	= oldImg.attr('src');

				if(newImg != oldImgSrc)
				{
					var next_img = new Image();
					next_img.src = newImg;
					
					var $next = $(next_img);
					
					if(big_prev.hasClass('avia-gallery-big-no-crop-thumb'))
					{
						$next.css({'height':big_prev.height(),'width':'auto'});
					}
					
					big_prev.stop().animate({opacity:0}, function()
					{
						$next.insertAfter(oldImg);
						oldImg.remove();
						big_prev.animate({opacity:1});
					});
				}
			});

			big_prev.on('click', function()
			{
				var imagelink = gallery.find('.avia-gallery-thumb a').eq(this.getAttribute("data-onclick") - 1);

				if(imagelink && !imagelink.hasClass('aviaopeninbrowser'))
				{
					imagelink.trigger('click');
				}
				else if(imagelink)
				{
					var imgurl = imagelink.attr("href");

					if(imagelink.hasClass('aviablank') && imgurl != '' )
					{
						window.open(imgurl, '_blank');
					}
					else if( imgurl != '' )
					{
						window.open(imgurl, '_self');
					}
				}
				return false;
			});


			$(window).on("debouncedresize", function()
			{
			  	big_prev.height('auto');
			});

		}
	});
}

// -------------------------------------------------------------------------------------------
// Toggle shortcode javascript
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_toggle = function(options)
{
	var defaults =
	{
		single: '.single_toggle',
		heading: '.toggler',
		content: '.toggle_wrap',
		sortContainer:'.taglist'
	};

	var win = $(window),
		options = $.extend(defaults, options);

	return this.each(function()
	{
		var container 	= $(this).addClass('enable_toggles'),
			toggles		= $(options.single, container),
			heading 	= $(options.heading, container),
			allContent 	= $(options.content, container),
			sortLinks	= $(options.sortContainer + " a", container);

		heading.each(function(i)
		{
			var thisheading =  $(this), content = thisheading.next(options.content, container);

			function scroll_to_viewport()
			{
			    //check if toggle title is in viewport. if not scroll up
			    var el_offset = content.offset().top,
			        scoll_target = el_offset - 50 - parseInt($('html').css('margin-top'),10);

			    if(win.scrollTop() > el_offset)
			    {
			        $('html:not(:animated),body:not(:animated)').animate({scrollTop: scoll_target},200);
			    }
			}

			if(content.css('visibility') != "hidden")
			{
				thisheading.addClass('activeTitle');
			}

			thisheading.on('click', function()
			{
				if(content.css('visibility') != "hidden")
				{
					content.slideUp(200, function()
					{
						content.removeClass('active_tc').attr({style:''});
						win.trigger('av-height-change');
					});
					thisheading.removeClass('activeTitle');

				}
				else
				{
					if(container.is('.toggle_close_all'))
					{
						allContent.not(content).slideUp(200, function()
						{
							$(this).removeClass('active_tc').attr({style:''});
							scroll_to_viewport();
						});
						heading.removeClass('activeTitle');
					}
					content.addClass('active_tc').slideDown(200,
					
					function()
					{
                        if(!container.is('.toggle_close_all'))
                        {
                            scroll_to_viewport();
                        }
                        
                        win.trigger('av-height-change');
					}
					
					);
					thisheading.addClass('activeTitle');
					location.replace(thisheading.data('fake-id'));
				}
				
				
				
			});
		});


		sortLinks.click(function(e){

			e.preventDefault();
			var show = toggles.filter('[data-tags~="'+$(this).data('tag')+'"]'),
				hide = toggles.not('[data-tags~="'+$(this).data('tag')+'"]');

				sortLinks.removeClass('activeFilter');
				$(this).addClass('activeFilter');
				heading.filter('.activeTitle').trigger('click');
				show.slideDown();
				hide.slideUp();
		});


		function trigger_default_open(hash)
		{
			if(!hash && window.location.hash) hash = window.location.hash;
			if(!hash) return;
			
			var open = heading.filter('[data-fake-id="'+hash+'"]');

			if(open.length)
			{
				if(!open.is('.activeTitle')) open.trigger('click');
				window.scrollTo(0, container.offset().top - 70);
			}
		}
		trigger_default_open(false);
		
		$('a').on('click',function(){
            var hash = $(this).attr('href');
            if(typeof hash != "undefined" && hash)
            {
                hash = hash.replace(/^.*?#/,'');
                trigger_default_open('#'+hash);
            }
        });

	});
};




// -------------------------------------------------------------------------------------------
// Tab Shortcode
// -------------------------------------------------------------------------------------------

$.fn.avia_sc_tabs= function(options)
{
	var defaults =
	{
		heading: '.tab',
		content:'.tab_content',
		active:'active_tab',
		sidebar: false
	};

	var win = $(window)
		options = $.extend(defaults, options);

	return this.each(function()
	{
		var container 	= $(this),
			tab_titles 	= $('<div class="tab_titles"></div>').prependTo(container),
			tabs 		= $(options.heading, container),
			content 	= $(options.content, container),
			newtabs 	= false,
			oldtabs 	= false;

		newtabs = tabs.clone();
		oldtabs = tabs.addClass('fullsize-tab');
		tabs = newtabs;

		tabs.prependTo(tab_titles).each(function(i)
		{
			var tab = $(this), the_oldtab = false;

			if(newtabs) the_oldtab = oldtabs.filter(':eq('+i+')');

			tab.addClass('tab_counter_'+i).bind('click', function()
			{
				open_content(tab, i, the_oldtab);
				return false;
			});

			if(newtabs)
			{
				the_oldtab.bind('click', function()
				{
					open_content(the_oldtab, i, tab);
					return false;
				});
			}
		});

		set_size();
		trigger_default_open(false);
		win.on("debouncedresize", set_size);
		
        $('a').on('click',function(){
            var hash = $(this).attr('href');
            if(typeof hash != "undefined" && hash)
            {
                hash = hash.replace(/^.*?#/,'');
                trigger_default_open('#'+hash);
            }
        });

		function set_size()
		{
			if(!options.sidebar) return;
			content.css({'min-height': tab_titles.outerHeight() + 1});
		}

		function open_content(tab, i, alternate_tab)
		{
			if(!tab.is('.'+options.active))
			{
				$('.'+options.active, container).removeClass(options.active);
				$('.'+options.active+'_content', container).removeClass(options.active+'_content');

				tab.addClass(options.active);

				var new_loc = tab.data('fake-id');
				if(typeof new_loc == 'string') location.replace(new_loc);

				if(alternate_tab) alternate_tab.addClass(options.active);
				var active_c = content.filter(':eq('+i+')').addClass(options.active+'_content');

				if(typeof click_container != 'undefined' && click_container.length)
				{
					sidebar_shadow.height(active_c.outerHeight());
				}
				
				//check if tab title is in viewport. if not scroll up
				var el_offset = active_c.offset().top,
					scoll_target = el_offset - 50 - parseInt($('html').css('margin-top'),10);
				
				if(win.scrollTop() > el_offset)
				{
					$('html:not(:animated),body:not(:animated)').scrollTop(scoll_target);
				}
			}
		}

		function trigger_default_open(hash)
		{
			if(!hash && window.location.hash) hash = window.location.hash;
            		if(!hash) return;
            		
			var open = tabs.filter('[data-fake-id="'+hash+'"]');

			if(open.length)
			{
				if(!open.is('.active_tab')) open.trigger('click');
				window.scrollTo(0, container.offset().top - 70);
			}
		}

	});
};



// -------------------------------------------------------------------------------------------
// Big Number animation shortcode javascript
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.avia_sc_animated_number = function(options)
	{
		var skipStep = false,
		start_count = function(element, countTo, increment, current, fakeCountTo)
		{
			//calculate the new number
			var newCount = current + increment;
			
			//if the number is bigger than our final number set the number and finish
			if(newCount >= fakeCountTo) 
			{
				element.text(countTo); //exit
			}
			else
			{
				var prepend = "", addZeros = countTo.toString().length - newCount.toString().length
				
				//if the number has less digits than the final number some zeros where omitted. add them to the front
				for(var i = addZeros; i > 0; i--){ prepend += "0"; }
				
				element.text(prepend + newCount);
				window.requestAnimationFrame(function(){ start_count(element, countTo, increment, newCount, fakeCountTo) });
			}
		};
	
		return this.each(function()
		{
			var number_container = $(this), elements = number_container.find('.avia-single-number'), countTimer = number_container.data('timer') || 3000;
			
			//prepare elements
			elements.each(function(i)
			{
				var element = $(this), text = element.text();
				if(window.addEventListener) element.text( text.replace(/./g, "0")); /*https://github.com/AviaThemes/wp-themes/issues/812*/
			});
			
			//trigger number animation
			number_container.addClass('number_prepared').on('avia_start_animation', function()
			{
				elements.each(function(i)
				{
					var element = $(this), countTo = element.data('number'), fakeCountTo = countTo, current = parseInt(element.text(),10), zeroOnly = /^0+$/.test(countTo), increment = 0;
					
					//fallback for decimals like 00 or 000
					if(zeroOnly) fakeCountTo = countTo.replace(/0/g, '9');
					
					increment = Math.round( fakeCountTo * 32 / countTimer);
					if(increment == 0 || increment % 10 == 0) increment += 1;
					
					setTimeout(function(){ start_count(element, countTo, increment, current, fakeCountTo);}, 300);
				});
			});
		});
	}
})(jQuery);




// -------------------------------------------------------------------------------------------
// contact form ajax
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.avia_ajax_form = function(variables)
	{
		var defaults =
		{
			sendPath: 'send.php',
			responseContainer: '.ajaxresponse'
		};

		var options = $.extend(defaults, variables);

		return this.each(function()
		{
			var form = $(this),
				form_sent = false,
				send =
				{
					formElements: form.find('textarea, select, input[type=text], input[type=checkbox], input[type=hidden]'),
					validationError:false,
					button : form.find('input:submit'),
					dataObj : {}
				},

				responseContainer = form.next(options.responseContainer+":eq(0)");

				send.button.bind('click', checkElements);
				
				
				//change type of email forms on mobile so the e-mail keyboard with @ sign is used
				if($.avia_utilities.isMobile)
				{
					send.formElements.each(function(i)
					{
						var currentElement = $(this), is_email = currentElement.hasClass('is_email');
						if(is_email) currentElement.attr('type','email');
					});
				}
			
			
			
			function send_ajax_form()
			{
				if(form_sent){ return false; }

				form_sent = true;
				send.button.addClass('av-sending-button');
				send.button.val(send.button.data('sending-label'));
				
				var redirect_to = form.data('avia-redirect') || false,
					action		= form.attr('action');
				
				responseContainer.load(action+' '+options.responseContainer, send.dataObj, function()
				{
					if(redirect_to && action != redirect_to)
					{
						form.attr('action', redirect_to);
						form.submit();
					}
					else
					{
						responseContainer.removeClass('hidden').css({display:"block"});
						form.slideUp(400, function(){responseContainer.slideDown(400, function(){ $('body').trigger('av_resize_finished'); }); send.formElements.val('');});
					}
				});
			}

			function checkElements()
			{
				// reset validation var and send data
				send.validationError = false;
				send.datastring = 'ajax=true';

				send.formElements.each(function(i)
				{
					var currentElement = $(this),
						surroundingElement = currentElement.parent(),
						value = currentElement.val(),
						name = currentElement.attr('name'),
					 	classes = currentElement.attr('class'),
					 	nomatch = true;

					 	if(currentElement.is(':checkbox'))
					 	{
					 		if(currentElement.is(':checked')) { value = true } else {value = ''}
					 	}

					 	send.dataObj[name] = encodeURIComponent(value);

					 	if(classes && classes.match(/is_empty/))
						{
							if(value == '')
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("valid");
							}
							nomatch = false;
						}

						if(classes && classes.match(/is_email/))
						{
							if(!value.match(/^[\w|\.|\-]+@\w[\w|\.|\-]*\.[a-zA-Z]{2,20}$/))
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("valid");
							}
							nomatch = false;
						}

						if(classes && classes.match(/is_phone/))
						{
							if(!value.match(/^(\d|\s|\-|\/|\(|\)|\[|\]|e|x|t|ension|\.|\+|\_|\,|\:|\;){3,}$/))
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("valid");
							}
							nomatch = false;
						}

						if(classes && classes.match(/is_number/))
						{
							if(!($.isNumeric(value)) || value == "")
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("valid");
							}
							nomatch = false;
						}

						if(classes && classes.match(/captcha/))
						{
							var verifier 	= form.find("#" + name + "_verifier").val(),
								lastVer		= verifier.charAt(verifier.length-1),
								finalVer	= verifier.charAt(lastVer);

							if(value != finalVer)
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("error");
								send.validationError = true;
							}
							else
							{
								surroundingElement.removeClass("valid error ajax_alert").addClass("valid");
							}
							nomatch = false;
						}

						if(nomatch && value != '')
						{
							surroundingElement.removeClass("valid error ajax_alert").addClass("valid");
						}
				});

				if(send.validationError == false)
				{
					send_ajax_form();
				}
				return false;
			}
		});
	};
})(jQuery);












// -------------------------------------------------------------------------------------------
// Aviaccordion Slideshow 
// 
// accordion slider script
// -------------------------------------------------------------------------------------------

	$.AviaccordionSlider  =  function(options, slider)
	{
	    this.$slider  	= $( slider );
	    this.$inner	  	= this.$slider.find('.aviaccordion-inner');
	    this.$slides	= this.$inner.find('.aviaccordion-slide');
	    this.$images	= this.$inner.find('.aviaccordion-image');
	    this.$last		= this.$slides.filter(':last');
	    this.$titles  	= this.$slider.find('.aviaccordion-preview');
	    this.$titlePos  = this.$slider.find('.aviaccordion-preview-title-pos');
	    this.$titleWrap = this.$slider.find('.aviaccordion-preview-title-wrap');
	    this.$win	  	= $( window );
	    
	    if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}
		
		this.browserPrefix 	= $.avia_utilities.supported.transition;
	    this.cssActive 		= this.browserPrefix !== false ? true : false;
	    this.transform3d	= document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
		this.isMobile 		= $.avia_utilities.isMobile;
		this.property		= this.browserPrefix + 'transform',
		this.count			= this.$slides.length;
		this.open			= false;
		this.autoplay		= false;
		this.increaseTitle  = this.$slider.is(".aviaccordion-title-on-hover");
		// this.cssActive    = false; //testing no css3 browser
		
	    this._init( options );
	}

  	$.AviaccordionSlider.prototype =
    {
    	_init: function( options )
    	{
    		var _self = this;
    		_self.options = $.extend({}, options, this.$slider.data());
			 $.avia_utilities.preload({container: this.$slider , single_callback:  function(){ _self._kickOff(); }});
    	},
    	
    	_kickOff: function()
    	{
    		var _self = this;
    		
    		_self._calcMovement();
    		_self._bindEvents();
    		_self._showImages();
    		_self._autoplay();
    	},
    	
    	_autoplay: function()
    	{
    		var _self = this;
    		
    		if(_self.options.autoplay)
    		{
    			_self.autoplay = setInterval(function()
    			{
    				_self.open = _self.open === false ? 0 : _self.open + 1;
    				if(_self.open >= _self.count) _self.open = 0;
    				_self._move({}, _self.open);
    				
    			}, _self.options.interval * 1000)
    		}
    	},
    	
    	_showImages: function()
    	{
    		var _self = this, counter = 0, delay = 300, title_delay = this.count * delay;
    		
    		if(this.cssActive)
    		{
    			setTimeout(function(){ _self.$slider.addClass('av-animation-active'); } , 10);
    		}
    		
    		this.$images.each(function(i)
    		{
    			var current = $(this), timer = delay * (i + 1);
    				
    			setTimeout(function()
    			{ 
    				current.avia_animate({opacity:1}, 400, function()
    				{
    					current.css($.avia_utilities.supported.transition + "transform", "none");
    				}); 
    			},timer);
    		});
    		
    		if(_self.increaseTitle) title_delay = 0;
    		
    		this.$titlePos.each(function(i)
    		{
    			var current = $(this), new_timer = title_delay + 100 * (i + 1);
    					
    			setTimeout(function()
    			{ 
    				current.avia_animate({opacity:1}, 200, function()
    				{
    					current.css($.avia_utilities.supported.transition + "transform", "none");
    				}); 
    			},new_timer);
    		});
    	},
    	
    	_bindEvents: function()
    	{
    		var trigger = this.isMobile ? "click" : "mouseenter";
    	
    		this.$slider.on(trigger,'.aviaccordion-slide', $.proxy( this._move, this));
    		this.$slider.on('mouseleave','.aviaccordion-inner', $.proxy( this._move, this));
    		this.$win.on('debouncedresize', $.proxy( this._calcMovement, this));
    		this.$slider.on('av-prev av-next', $.proxy( this._moveTo, this));
    		
    		if(this.isMobile)
    		{
    			this.$slider.avia_swipe_trigger({next: this.$slider, prev: this.$slider, event:{prev: 'av-prev', next: 'av-next'}});
    		}
    		
    	},
    	
    	_titleHeight: function()
    	{
    		var th = 0;
    		
    		this.$titleWrap.css({'height':'auto'}).each(function()
    		{
    			var new_h = $(this).outerHeight();
    			if( new_h > th) th = new_h;
    		
    		}).css({'height':th + 2});
    		
    	},
    	
    	_calcMovement: function(event, allow_repeat)
    	{ 
    		var _self			= this,
    			containerWidth	= this.$slider.width(),
    			defaultPos		= this.$last.data('av-left'),
    			imgWidth		= this.$images.filter(':last').width() || containerWidth,
    			imgWidthPercent = Math.floor((100 / containerWidth) * imgWidth),
    			allImageWidth	= imgWidthPercent * _self.count,
    			modifier		= 3, // 10 - _self.count,
    			tempMinLeft		= 100 - imgWidthPercent,
    			minLeft 		= tempMinLeft > defaultPos / modifier ? tempMinLeft : 0,
    			oneLeft			= minLeft / (_self.count -1 ),
    			titleWidth		= imgWidth;
    		
    		
    		
    		if(allImageWidth < 110 && allow_repeat !== false)
    		{
    			//set height if necessary	
    			var slideHeight = this.$slider.height(), 
    				maxHeight 	= (slideHeight / allImageWidth) * 110 ;
    			
    			this.$slider.css({'max-height': maxHeight});
    			_self._calcMovement(event, false);
    			return;
    		}
    		
    		//backup so the minimized slides dont get too small
    		if(oneLeft < 2) minLeft = 0;
    		
			this.$slides.each(function(i)
			{
				var current = $(this), newLeft = 0, newRight = 0, defaultLeft = current.data('av-left');
					
				if( minLeft !== 0)
				{
					newLeft  = oneLeft * i;
					newRight = imgWidthPercent + newLeft - oneLeft;
				}
				else
				{
					newLeft  = defaultLeft / Math.abs(modifier);
					newRight = 100 - ((newLeft / i) * (_self.count - i));
				}
				
				if(i == 1 && _self.increaseTitle) { titleWidth = newRight + 1; } 
				
				if(_self.cssActive)
				{	
					//if we are not animating based on the css left value but on css transform we need to subtract the left value
					newLeft = newLeft - defaultLeft;
					newRight = newRight - defaultLeft;
					defaultLeft = 0;
				}
				
				current.data('av-calc-default', defaultLeft);
				current.data('av-calc-left', newLeft);
				current.data('av-calc-right', newRight);
				
			});
			
			if(_self.increaseTitle) { _self.$titles.css({width: titleWidth + "%"});} 
    	},
    	
    	_moveTo: function(event)
    	{
    		var direction 	= event.type == "av-next" ? 1 : -1,
    			nextSlide 	= this.open === false ? 0 : this.open + direction;
    			
    		if(nextSlide >= 0 && nextSlide < this.$slides.length) this._move(event, nextSlide);
    	},
    	
    	_move: function(event, direct_open)
    	{
    		var _self  = this,
    			slide  = event.currentTarget,
    			itemNo = typeof direct_open != "undefined" ? direct_open : this.$slides.index(slide);
    			
    		this.open = itemNo;
    		
    		if(_self.autoplay && typeof slide != "undefined") { clearInterval(_self.autoplay); _self.autoplay == false; }
    		
    		this.$slides.removeClass('aviaccordion-active-slide').each(function(i)
    		{
    			var current 	= $(this),
    				dataSet 	= current.data(),
    				trans_val	= i <= itemNo ? dataSet.avCalcLeft : dataSet.avCalcRight,
					transition 	= {},
					reset		= event.type == 'mouseleave' ? 1 : 0,
					active 		= itemNo === i ? _self.$titleWrap.eq(i) : false;
    			
    			if(active) current.addClass('aviaccordion-active-slide');
    				
    			if(reset)
    			{
    				trans_val = dataSet.avCalcDefault; 
    				this.open = false;
    			}
    				
				if(_self.cssActive) //do a css3 animation
				{
					//move the slides
					transition[_self.property]  = _self.transform3d ? "translate3d(" + trans_val  + "%, 0, 0)" : "translate(" + trans_val + "%,0)"; //3d or 2d transform?
					current.css(transition);
				}
				else
				{
					transition.left =  trans_val + "%";
					current.stop().animate(transition, 700, 'easeOutQuint');
				}	
    		});
    	}
    };


$.fn.aviaccordion = function( options )
{
	return this.each(function()
	{
		var active = $.data( this, 'AviaccordionSlider' );

		if(!active)
		{
			//make sure that the function doesnt get aplied a second time
			$.data( this, 'AviaccordionSlider', 1 );
			
			//create the preparations for fullscreen slider
			new $.AviaccordionSlider( options, this );
		}
	});
}



























// -------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------------------------------------


//waipoint script when something comes into viewport
 $.fn.avia_waypoints = function(options_passed)
	{
		if(! $('html').is('.avia_transform')) return;

		var defaults = { offset: 'bottom-in-view' , triggerOnce: true},
			options  = $.extend({}, defaults, options_passed),
			isMobile = $.avia_utilities.isMobile;

		return this.each(function()
		{
			var element = $(this);
			
			setTimeout(function()
			{
				if(isMobile)
				{
					element.addClass('avia_start_animation').trigger('avia_start_animation');
				}
				else
				{
					element.waypoint(function(direction)
					{
					 	$(this).addClass('avia_start_animation').trigger('avia_start_animation');
	
					}, options );
				}
			},100)
			
		});
	};







// window resize script
var $event = $.event, $special, resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 150
};





$.easing['jswing'] = $.easing['swing'];

$.extend( $.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) { return $.easing[$.easing.def](x, t, b, c, d); },
	easeInQuad: function (x, t, b, c, d) { return c*(t/=d)*t + b; },
	easeOutQuad: function (x, t, b, c, d) { return -c *(t/=d)*(t-2) + b; },
	easeInOutQuad: function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t + b; return -c/2 * ((--t)*(t-2) - 1) + b; },
	easeInCubic: function (x, t, b, c, d) { return c*(t/=d)*t*t + b; },
	easeOutCubic: function (x, t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b; },
	easeInOutCubic: function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t*t + b; return c/2*((t-=2)*t*t + 2) + b;	},
	easeInQuart: function (x, t, b, c, d) { return c*(t/=d)*t*t*t + b;	},
	easeOutQuart: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b; },
	easeInOutQuart: function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t*t*t + b; return -c/2 * ((t-=2)*t*t*t - 2) + b;	},
	easeInQuint: function (x, t, b, c, d) { return c*(t/=d)*t*t*t*t + b;	},
	easeOutQuint: function (x, t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b;	},
	easeInOutQuint: function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b; return c/2*((t-=2)*t*t*t*t + 2) + b;	},
	easeInSine: function (x, t, b, c, d) {	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;	},
	easeOutSine: function (x, t, b, c, d) { return c * Math.sin(t/d * (Math.PI/2)) + b;	},
	easeInOutSine: function (x, t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;	},
	easeInExpo: function (x, t, b, c, d) { return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;	},
	easeOutExpo: function (x, t, b, c, d) { return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) { return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;	},
	easeOutCirc: function (x, t, b, c, d) {return c * Math.sqrt(1 - (t=t/d-1)*t) + b;	},
	easeInOutCirc: function (x, t, b, c, d) { if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

})( jQuery );



/*utility functions*/


(function($)
{
	"use strict";

	$.avia_utilities = $.avia_utilities || {};

	/************************************************************************
	gloabl loading function
	*************************************************************************/
	$.avia_utilities.loading = function(attach_to, delay){

		var loader = {

			active: false,

			show: function()
			{
				if(loader.active === false)
				{
					loader.active = true;
					loader.loading_item.css({display:'block', opacity:0});
				}

				loader.loading_item.stop().animate({opacity:0.7});
			},

			hide: function()
			{	
				if(typeof delay === 'undefined'){ delay = 600; }

				loader.loading_item.stop().delay( delay ).animate({opacity:0}, function()
				{
					loader.loading_item.css({display:'none'});
					loader.active = false;
				});
			},

			attach: function()
			{
				if(typeof attach_to === 'undefined'){ attach_to = 'body';}

				loader.loading_item = $('<div class="avia_loading_icon"></div>').css({display:"none"}).appendTo(attach_to);
			}
		}

		loader.attach();
		return loader;
	};
	
	/************************************************************************
	gloabl play/pause visualizer function
	*************************************************************************/
	$.avia_utilities.playpause = function(attach_to, delay){

		var pp = {

			active: false,
			to1: "", 
			to2: "", 
			set: function(status)
			{	
				pp.loading_item.removeClass('av-play av-pause');
				pp.to1 = setTimeout(function(){ pp.loading_item.addClass('av-' + status); },10);
				pp.to2 = setTimeout(function(){ pp.loading_item.removeClass('av-' + status); },1500);
			},

			attach: function()
			{
				if(typeof attach_to === 'undefined'){ attach_to = 'body';}

				pp.loading_item = $('<div class="avia_playpause_icon"></div>').css({display:"none"}).appendTo(attach_to);
			}
		}

		pp.attach();
		return pp;
	};
	
	

	/************************************************************************
	preload images, as soon as all are loaded trigger a special load ready event
	*************************************************************************/
	$.avia_utilities.preload_images = 0;
	$.avia_utilities.preload = function(options_passed)
	{
		var win		= $(window),
		defaults	=
		{
			container:			'body',
			maxLoops:			10,
			trigger_single:		true,
			single_callback:	function(){},
			global_callback:	function(){}

		},

		options		= $.extend({}, defaults, options_passed),

		methods		= {

			checkImage: function(container)
			{
				container.images.each(function()
				{
					if(this.complete === true)
					{
						container.images = container.images.not(this);
						$.avia_utilities.preload_images -= 1;
					}
				});

				if(container.images.length && options.maxLoops >= 0)
				{
					options.maxLoops-=1;
					setTimeout(function(){ methods.checkImage(container); }, 500);
				}
				else
				{
					$.avia_utilities.preload_images = $.avia_utilities.preload_images - container.images.length;
					methods.trigger_loaded(container);
				}
			},

			trigger_loaded: function(container)
			{
				if(options.trigger_single !== false)
				{
					win.trigger('avia_images_loaded_single', [container]);
					options.single_callback.call(container);
				}

				if($.avia_utilities.preload_images === 0)
				{
					win.trigger('avia_images_loaded');
					options.global_callback.call();
				}

			}
		};

		if(typeof options.container === 'string'){options.container = $(options.container); }

		options.container.each(function()
		{
			var container		= $(this);

			container.images	= container.find('img');
			container.allImages	= container.images;

			$.avia_utilities.preload_images += container.images.length;
			setTimeout(function(){ methods.checkImage(container); }, 10);
		});
	};



	/************************************************************************
	CSS Easing transformation table
	*************************************************************************/
	/*
	Easing transform table from jquery.animate-enhanced plugin
	http://github.com/benbarnett/jQuery-Animate-Enhanced
	*/
	$.avia_utilities.css_easings = {
			linear:			'linear',
			swing:			'ease-in-out',
			bounce:			'cubic-bezier(0.0, 0.35, .5, 1.3)',
			easeInQuad:     'cubic-bezier(0.550, 0.085, 0.680, 0.530)' ,
			easeInCubic:    'cubic-bezier(0.550, 0.055, 0.675, 0.190)' ,
			easeInQuart:    'cubic-bezier(0.895, 0.030, 0.685, 0.220)' ,
			easeInQuint:    'cubic-bezier(0.755, 0.050, 0.855, 0.060)' ,
			easeInSine:     'cubic-bezier(0.470, 0.000, 0.745, 0.715)' ,
			easeInExpo:     'cubic-bezier(0.950, 0.050, 0.795, 0.035)' ,
			easeInCirc:     'cubic-bezier(0.600, 0.040, 0.980, 0.335)' ,
			easeInBack:     'cubic-bezier(0.600, -0.280, 0.735, 0.04)' ,
			easeOutQuad:    'cubic-bezier(0.250, 0.460, 0.450, 0.940)' ,
			easeOutCubic:   'cubic-bezier(0.215, 0.610, 0.355, 1.000)' ,
			easeOutQuart:   'cubic-bezier(0.165, 0.840, 0.440, 1.000)' ,
			easeOutQuint:   'cubic-bezier(0.230, 1.000, 0.320, 1.000)' ,
			easeOutSine:    'cubic-bezier(0.390, 0.575, 0.565, 1.000)' ,
			easeOutExpo:    'cubic-bezier(0.190, 1.000, 0.220, 1.000)' ,
			easeOutCirc:    'cubic-bezier(0.075, 0.820, 0.165, 1.000)' ,
			easeOutBack:    'cubic-bezier(0.175, 0.885, 0.320, 1.275)' ,
			easeInOutQuad:  'cubic-bezier(0.455, 0.030, 0.515, 0.955)' ,
			easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)' ,
			easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)' ,
			easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)' ,
			easeInOutSine:  'cubic-bezier(0.445, 0.050, 0.550, 0.950)' ,
			easeInOutExpo:  'cubic-bezier(1.000, 0.000, 0.000, 1.000)' ,
			easeInOutCirc:  'cubic-bezier(0.785, 0.135, 0.150, 0.860)' ,
			easeInOutBack:  'cubic-bezier(0.680, -0.550, 0.265, 1.55)' ,
			easeInOutBounce:'cubic-bezier(0.580, -0.365, 0.490, 1.365)',
			easeOutBounce:	'cubic-bezier(0.760, 0.085, 0.490, 1.365)' 
		};

	/************************************************************************
	check if a css feature is supported and save it to the supported array
	*************************************************************************/
	$.avia_utilities.supported	= {};
	$.avia_utilities.supports	= (function()
	{
		var div		= document.createElement('div'),
			vendors	= ['Khtml', 'Ms','Moz','Webkit'];  // vendors	= ['Khtml', 'Ms','Moz','Webkit','O']; 

		return function(prop, vendor_overwrite)
		{
			if ( div.style[prop] !== undefined  ) { return ""; }
			if (vendor_overwrite !== undefined) { vendors = vendor_overwrite; }

			prop = prop.replace(/^[a-z]/, function(val)
			{
				return val.toUpperCase();
			});

			var len	= vendors.length;
			while(len--)
			{
				if ( div.style[vendors[len] + prop] !== undefined )
				{
					return "-" + vendors[len].toLowerCase() + "-";
				}
			}

			return false;
		};

	}());

	/************************************************************************
	animation function
	*************************************************************************/
	$.fn.avia_animate = function(prop, speed, easing, callback)
	{
		if(typeof speed === 'function') {callback = speed; speed = false; }
		if(typeof easing === 'function'){callback = easing; easing = false;}
		if(typeof speed === 'string'){easing = speed; speed = false;}

		if(callback === undefined || callback === false){ callback = function(){}; }
		if(easing === undefined || easing === false)	{ easing = 'easeInQuad'; }
		if(speed === undefined || speed === false)		{ speed = 400; }

		if($.avia_utilities.supported.transition === undefined)
		{
			$.avia_utilities.supported.transition = $.avia_utilities.supports('transition');
		}


		if($.avia_utilities.supported.transition !== false )
		{
			var prefix		= $.avia_utilities.supported.transition + 'transition',
				cssRule		= {},
				cssProp		= {},
				thisStyle	= document.body.style,
				end			= (thisStyle.WebkitTransition !== undefined) ? 'webkitTransitionEnd' : (thisStyle.OTransition !== undefined) ? 'oTransitionEnd' : 'transitionend';

			//translate easing into css easing
			easing = $.avia_utilities.css_easings[easing];

			//create css transformation rule
			cssRule[prefix]	=  'all '+(speed/1000)+'s '+easing;
			//add namespace to the transition end trigger
			end = end + ".avia_animate";
			
			//since jquery 1.10 the items passed need to be {} and not [] so make sure they are converted properly
			for (var rule in prop)
			{
				if (prop.hasOwnProperty(rule)) { cssProp[rule] = prop[rule]; }
			}
			prop = cssProp;
			
			
			
			this.each(function()
			{
				var element	= $(this), css_difference = false, rule, current_css;

				for (rule in prop)
				{
					if (prop.hasOwnProperty(rule))
					{
						current_css = element.css(rule);

						if(prop[rule] != current_css && prop[rule] != current_css.replace(/px|%/g,""))
						{
							css_difference = true;
							break;
						}
					}
				}

				if(css_difference)
				{
					//if no transform property is set set a 3d translate to enable hardware acceleration
					if(!($.avia_utilities.supported.transition+"transform" in prop))
					{
						prop[$.avia_utilities.supported.transition+"transform"] = "translateZ(0)";
					}
					
					element.on(end,  function(event)
					{
						if(event.target != event.currentTarget) return false;

						cssRule[prefix] = "none";

						element.off(end);
						element.css(cssRule);
						setTimeout(function(){ callback.call(element); });
					});
					
					setTimeout(function(){ element.css(cssRule);},10);
					setTimeout(function(){ element.css(prop);	},20);
				}
				else
				{
					setTimeout(function(){ callback.call(element); });
				}

			});
		}
		else // if css animation is not available use default JS animation
		{
			this.animate(prop, speed, easing, callback);
		}

		return this;
	};

})( jQuery );


/* ======================================================================================================================================================
Avia Slideshow
====================================================================================================================================================== */

(function($)
{
    "use strict";

	$.AviaSlider  =  function(options, slider)
	{
		var self = this;
		
		this.$win	 = $( window );
		
	    this.$slider = $( slider );
	    
		this.isMobile = $.avia_utilities.isMobile;
	    
	    this._prepareSlides(options);
	    
		//default preload images then init slideshow
	    $.avia_utilities.preload({container: this.$slider , single_callback:  function(){ self._init( options ); }});
	}

	$.AviaSlider.defaults  = {

		//interval between autorotation switches
		interval:5,

		//autorotation active or not
		autoplay:false,
		
		//set if the loop will stop at the last/first slide or if the slides will loop infinite
		//set to false for infinite loop, "last" to stop at the last slide or "first" to stop at the first slide
		stopinfiniteloop: false,

		//fade or slide animation
		animation:'slide',

		//transition speed when switching slide
		transitionSpeed:900,

		//easing method for the transition
		easing:'easeInOutQuart',

		//slide wrapper
		wrapElement: '>ul',

		//slide element
		slideElement: '>li',

		//pause if mouse cursor is above item
		hoverpause: false,
		
		//attach images as background
		bg_slider: false,
		
		//delay of miliseconds to wait before showing the next slide
		show_slide_delay: 0

	};

  	$.AviaSlider.prototype =
    {
    	_init: function( options )
    	{
			// set slider options
			this.options = this._setOptions(options);

			//slidewrap
			this.$sliderUl  = this.$slider.find(this.options.wrapElement);

			// slide elements
			this.$slides = this.$sliderUl.find(this.options.slideElement);

			// goto dots
			this.gotoButtons = this.$slider.find('.avia-slideshow-dots a');
			
			//perma caption
			this.permaCaption =  this.$slider.find('>.av-slideshow-caption');

			// slide count
			this.itemsCount = this.$slides.length;

			// current image index
			this.current = 0;

			//loop count
			this.loopCount = 0;

			// control if the slicebox is animating
			this.isAnimating = false;

			// css browser prefix like -webkit-, -moz-
			this.browserPrefix = $.avia_utilities.supports('transition');
			
			// css3 animation?
			this.cssActive = this.browserPrefix !== false ? true : false;
			
			// css3D animation?
			this.css3DActive = document.documentElement.className.indexOf('avia_transform3d') !== -1 ? true : false;
			
			//store the aviaVideoApi object for the current slide if available
			this.video	= false;
			
			//if we have a bg slider no images were preloaded yet. in that case start preloading and attaching images
			if(this.options.bg_slider == true)
			{
				//create array that holds all image urls to preload
				this.imageUrls = [];
				
				//create a preloader icon to indicate loading
				this.loader = $.avia_utilities.loading(this.$slider);
				
				//preload the images ony by one
				this._bgPreloadImages();
				
			}
			else //if it was a default slider all images are already loaded and we can start showing the slider
			{			
				//kickoff the slider: bind functions, show first slide, if active start the autorotation timer
				this._kickOff();
			}
    	},

    	//set the slider options by first merging the efault options and the passed options, then checking the slider element if any data attributes overwrite the option set
    	_setOptions: function(options)
		{
			var newOptions 	= $.extend( true, {}, $.AviaSlider.defaults, options ),
				htmlData 	= this.$slider.data(),
				i 			= "";

			//overwritte passed option set with any data properties on the html element
			for (i in htmlData)
			{
				if (htmlData.hasOwnProperty(i))
				{
					if(typeof htmlData[i] === "string" || typeof htmlData[i] === "number" || typeof htmlData[i] === "boolean")
					{
						newOptions[i] = htmlData[i];
					}
				}
			}

			return newOptions;
		},
		
		_prepareSlides: function(options)
		{	
			//if its a mobile device find all video slides that need to be altered
			if(this.isMobile)
			{
				var alter = this.$slider.find('.av-mobile-fallback-image');
				alter.each(function()
				{	
					var current  = $(this).removeClass('av-video-slide').data({'avia_video_events': true, 'video-ratio':0}),
						fallback = current.data('mobile-img');
						
					current.find('.av-click-overlay, .mejs-mediaelement, .mejs-container').remove();
					
					if(!fallback)
					{
						var appendTo = current.find('.avia-slide-wrap');
						$('<p class="av-fallback-message"><span>Please set a mobile device fallback image for this video in your wordpress backend</span></p>').appendTo(appendTo);
					}
					
					if(options && options.bg_slider)
					{
						current.data('img-url', fallback);
					}
					else
					{
						var image = $('<img src="'+fallback+'" alt="" title="" />');
						current.find('.avia-slide-wrap').append(image);
					}
					
				});
			}
			
		},
		
		//start preloading the background images
		_bgPreloadImages : function(callback)
    	{
    		this._getImageURLS();
    		this._preloadSingle(0, function()
    		{
    			this._kickOff();
				this._preloadNext(1);
    		});
    	},
		
    	//if we are using a background image slider, fetch the images from a data attribute and preload them one by one
    	_getImageURLS: function()
    	{
    		var _self = this;
    		
    		//collect url strings of the images to preload
			this.$slides.each(function(i)
			{
				_self.imageUrls[i] = [];
				_self.imageUrls[i]['url'] = $(this).data("img-url");
				
				//if no image is passed we can set the slide to loaded
				if(typeof _self.imageUrls[i]['url'] == 'string')
				{
					_self.imageUrls[i]['status'] = false;
				}
				else
				{
					_self.imageUrls[i]['status'] = true;
				}
			});
    	},
    	
    	
    	_preloadSingle: function(key, callback)
		{
			var _self 		= this,
				objImage	= new Image();
			
			if(typeof _self.imageUrls[key]['url'] == 'string')
			{
				$(objImage).bind('load error', function()
				{ 
					_self.imageUrls[key]['status'] = true; 
					_self.$slides.eq(key).css('background-image','url(' + _self.imageUrls[key]['url'] + ')');
					if(typeof callback == 'function') callback.apply( _self, [objImage, key] );
				});
				
				objImage.src = _self.imageUrls[key]['url'];
			}
			else
			{
				if(typeof callback == 'function') callback.apply( _self, [objImage, key] );
			}
		},
		
		_preloadNext: function(key)
		{
			if(typeof this.imageUrls[key] != "undefined")
    		{
				this._preloadSingle(key, function()
	    		{
					this._preloadNext(key + 1);
	    		});
    		}
		},
    	

    	//bind click events of slide controlls to the public functions
    	_bindEvents: function()
    	{
    		var self = this,
    			win  = $( window );

    		this.$slider.on('click','.next-slide', $.proxy( this.next, this) );
    		this.$slider.on('click','.prev-slide', $.proxy( this.previous, this) );
    		this.$slider.on('click','.goto-slide', $.proxy( this.go2, this) );

    		if(this.options.hoverpause)
    		{
    			this.$slider.on('mouseenter', $.proxy( this.pause, this) );
    			this.$slider.on('mouseleave', $.proxy( this.resume, this) );
    		}

			if(this.options.stopinfiniteloop && this.options.autoplay)
			{
				if(this.options.stopinfiniteloop == 'last')
				{
					this.$slider.on('avia_slider_last_slide', $.proxy(this._stopSlideshow, this) );
				}
				else if(this.options.stopinfiniteloop == 'first')
				{
					this.$slider.on('avia_slider_first_slide', $.proxy(this._stopSlideshow, this) );
				}
			}

    		win.on( 'debouncedresize.aviaSlider',  $.proxy( this._setSize, this) );

    		//if its a desktop browser add arrow navigation, otherwise add touch nav
    		if(!this.isMobile)
    		{
    			this.$slider.avia_keyboard_controls();
    		}
    		else
    		{
    			this.$slider.avia_swipe_trigger();
    		}
			
			self._attach_video_events();
    	},

    	//kickoff the slider by binding all functions to slides and buttons, show the first slide and start autoplay
    	_kickOff: function()
    	{
    		var self 			= this,
    			first_slide 	= self.$slides.eq(0),
    			video			= first_slide.data('video-ratio');
    		  		
    		// bind events to to the controll buttons
			self._bindEvents();
    		
    		//show the first slide. if its a video set the correct size, otherwise make sure to remove the % padding
    		if(video)
    		{ 
    			self._setSize(true); 
    		}
    		else
    		{
    			self.$sliderUl.css('padding',0);
    			self.$win.trigger('av-height-change');
    		}
    		
    		first_slide.css({visibility:'visible', opacity:0}).avia_animate({opacity:1}, function()
    		{
    			var current = $(this).addClass('active-slide');
    			
    			if(self.permaCaption.length)
	    		{
	    			self.permaCaption.addClass('active-slide');
	    		}
    		});
    		
    		// start autoplay if active
			if( self.options.autoplay )
			{
				self._startSlideshow();
			}
    		
    	},

    	//calculate which slide should be displayed next and call the executing transition function
    	_navigate : function( dir, pos ) {

			if( this.isAnimating || this.itemsCount < 2 )
			{
				return false;
			}
			
			this.isAnimating = true;

			// current item's index
			this.prev = this.current;

			// if position is passed
			if( pos !== undefined )
			{
				this.current = pos;
				dir = this.current > this.prev ? 'next' : 'prev';
			}
			// if not check the boundaries
			else if( dir === 'next' )
			{
				this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
				
				if( this.current === 0 && this.options.autoplay_stopper == 1 && this.options.autoplay )
				{
					this.isAnimating = false;
					this.current = this.prev;
					this._stopSlideshow();
					return false;
				}
			}
			else if( dir === 'prev' )
			{
				this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;
			}

			//set goto button
			this.gotoButtons.removeClass('active').eq(this.current).addClass('active');

			//set slideshow size
			this._setSize();
			
			//if we are using a background slider make sure that the image is loaded. if not preload it, then show the slide
			if(this.options.bg_slider == true)
			{
				if(this.imageUrls[this.current]['status'] == true )
				{
					this['_' + this.options.animation].call(this, dir);
				}
				else
				{
					this.loader.show();
					this._preloadSingle(this.current, function()
    				{
    					this['_' + this.options.animation].call(this, dir);
    					this.loader.hide();
    				});
				}
			}
			else //no background loader -> images are already loaded
			{
				//call the executing function. for example _slide, or _fade. since the function call is absed on a var we can easily extend the slider with new animations
				this['_' + this.options.animation].call(this, dir);
			}

			if(this.current == 0)
			{
				this.loopCount++;
				this.$slider.trigger('avia_slider_first_slide');
			}
			else if(this.current == this.itemsCount - 1)
			{
				this.$slider.trigger('avia_slider_last_slide');
			}
			else
			{
				this.$slider.trigger('avia_slider_navigate_slide');
			}
		},

		//if the next slide has a different height than the current change the slideshow height
		_setSize: function(instant)
		{
			//if images are attached as bg images the slider has a fixed height
			if(this.options.bg_slider == true) return;
		
			var self    		= this,
				slide 			= this.$slides.eq(this.current),
				current			= Math.floor(this.$sliderUl.height()),
				ratio			= slide.data('video-ratio'),
				setTo   		= ratio ? this.$sliderUl.width() / ratio : Math.floor(slide.height()),
				video_height 	= slide.data('video-height'), //forced video height %. needs to be set only once
				video_toppos 	= slide.data('video-toppos'); //forced video top position
				
				this.$sliderUl.height(current).css('padding',0); //make sure to set the slideheight to an actual value

				if(setTo != current)
				{
					if(instant == true)
					{
						this.$sliderUl.css({height:setTo});
						this.$win.trigger('av-height-change');
					}
					else
					{
						this.$sliderUl.avia_animate({height:setTo}, function()
						{
							self.$win.trigger('av-height-change');
						});
					}
				}
				
				if(video_height && video_height!= "set")
				{
					slide.find('iframe, embed, video, object, .av_youtube_frame').css({height: video_height + '%', top: video_toppos + '%'});
					slide.data('video-height','set');
				}
		},


		
		_slide: function(dir)
		{
			var sliderWidth		= this.$slider.width(),
				direction		= dir === 'next' ? -1 : 1,
				property  		= this.browserPrefix + 'transform',
				reset			= {}, transition = {},  transition2 = {},
				trans_val 		= ( sliderWidth * direction * -1),
				trans_val2 		= ( sliderWidth * direction);
			
			//do a css3 animation
			if(this.cssActive)
			{
				property  = this.browserPrefix + 'transform';

				//do a translate 3d transformation if available, since it uses hardware acceleration
				if(this.css3DActive)
				{
					reset[property]  = "translate3d(" + trans_val + "px, 0, 0)";
					transition[property]  = "translate3d(" + trans_val2 + "px, 0, 0)";
					transition2[property] = "translate3d(0,0,0)";
				}
				else //do a 2d transform. still faster than a position "left" change
				{
					reset[property]  = "translate(" + trans_val + "px,0)";
					transition[property]  = "translate(" + trans_val2 + "px,0)";
					transition2[property] = "translate(0,0)";					}
			}
			else
			{
				reset.left = trans_val;
				transition.left = trans_val2;
				transition2.left = 0;
			}
			
			this._slide_animate(reset, transition, transition2);
		},
		
		_slide_up: function(dir)
		{
			var sliderHeight	= this.$slider.height(),
				direction		= dir === 'next' ? -1 : 1,
				property  		= this.browserPrefix + 'transform',
				reset			= {}, transition = {},  transition2 = {},
				trans_val 		= ( sliderHeight * direction * -1),
				trans_val2 		= ( sliderHeight * direction);
			
			//do a css3 animation
			if(this.cssActive)
			{
				property  = this.browserPrefix + 'transform';

				//do a translate 3d transformation if available, since it uses hardware acceleration
				if(this.css3DActive)
				{
					reset[property]  = "translate3d( 0," + trans_val + "px, 0)";
					transition[property]  = "translate3d( 0," + trans_val2 + "px, 0)";
					transition2[property] = "translate3d(0,0,0)";
				}
				else //do a 2d transform. still faster than a position "left" change
				{
					reset[property]  = "translate( 0," + trans_val + "px)";
					transition[property]  = "translate( 0," + trans_val2 + "px)";
					transition2[property] = "translate(0,0)";					}
			}
			else
			{
				reset.top = trans_val;
				transition.top = trans_val2;
				transition2.top = 0;
			}
			
			this._slide_animate(reset, transition, transition2);
		},
		
		
		//slide animation: do a slide transition by css3 transform if possible. if not simply do a position left transition
		_slide_animate: function( reset , transition , transition2 )
		{
		
			var self			= this,
				displaySlide 	= this.$slides.eq(this.current),
				hideSlide		= this.$slides.eq(this.prev);
				
				hideSlide.trigger('pause');	
				if( !displaySlide.data('disableAutoplay') ) displaySlide.trigger('play');

				displaySlide.css({visibility:'visible', zIndex:4, opacity:1, left:0, top:0});
				displaySlide.css(reset);
				
				hideSlide.avia_animate(transition, this.options.transitionSpeed, this.options.easing);

				var after_slide = function()
				{
					self.isAnimating = false;
					displaySlide.addClass('active-slide');
					hideSlide.css({visibility:'hidden'}).removeClass('active-slide');
					self.$slider.trigger('avia-transition-done');
				}
				
				if(self.options.show_slide_delay > 0)
				{
					setTimeout(function() { displaySlide.avia_animate(transition2, self.options.transitionSpeed, self.options.easing, after_slide); },self.options.show_slide_delay);
				}
				else
				{
					displaySlide.avia_animate(transition2, self.options.transitionSpeed, self.options.easing, after_slide);
				}

		},
		
		//simple fade transition of the slideshow
		_fade: function()
		{
			var self			= this,
				displaySlide 	= this.$slides.eq(this.current),
				hideSlide		= this.$slides.eq(this.prev);
			
			hideSlide.trigger('pause');	
			if( !displaySlide.data('disableAutoplay') ) displaySlide.trigger('play');

			displaySlide.css({visibility:'visible', zIndex:3, opacity:0}).avia_animate({opacity:1}, this.options.transitionSpeed/2, 'linear', function()
			{
				hideSlide.avia_animate({opacity:0}, 200, 'linear', function()
				{
					self.isAnimating = false;
					displaySlide.addClass('active-slide');
					hideSlide.css({visibility:'hidden', zIndex:2}).removeClass('active-slide');
					self.$slider.trigger('avia-transition-done');
				});
			});
			
			
		},
		
		
		/************************************************************************
		Video functions
		*************************************************************************/
		
		//bind events to the video that tell the slider to autorotate once a video has been played
		_attach_video_events: function()
		{
			var self = this, $html = $('html');
						
			self.$slides.each(function(i)
			{
				var currentSlide 	= $(this),
					caption			= currentSlide.find('.caption_fullwidth, .av-click-overlay'),
					mejs			= currentSlide.find('.mejs-mediaelement');
								
				if(currentSlide.data('avia_video_events') != true)
				{
					currentSlide.data('avia_video_events', true);
					
					currentSlide.on('av-video-events-bound', { slide: currentSlide, wrap: mejs , iteration: i , self: self }, onReady);
					
					currentSlide.on('av-video-ended', { slide: currentSlide , self: self}, onFinish);
					
					currentSlide.on('av-video-play-executed', function(){ setTimeout(function(){  self.pause() }, 100); });
						
					caption.on('click', { slide: currentSlide }, toggle);
					
					// also if the player was loaded before the _bindEvents function was bound trigger it manually
					if(currentSlide.is('.av-video-events-bound')) currentSlide.trigger('av-video-events-bound');
				}
			});
			
			
			//helper functions
			function onReady( event ) 
			{ 	
				//autostart for first slide
				if(event.data.iteration === 0) 
				{	
					event.data.wrap.css('opacity',0);
					if(!event.data.self.isMobile && !event.data.slide.data('disableAutoplay')) { event.data.slide.trigger('play'); } 
					setTimeout(function(){ event.data.wrap.avia_animate({opacity:1}, 400); }, 50);
				}
				else if ($html.is('.avia-msie') && !event.data.slide.is('.av-video-service-html5'))
				{	
					/*
					* Internet Explorer fires the ready event for external videos once they become visible 
					* as oposed to other browsers which always fire immediately. 
					*/
					if( !event.data.slide.data('disableAutoplay') ) event.data.slide.trigger('play');
				}
				
			}
			
			
			
			
			function onFinish( event )
			{ 	
				//if the video is not looped resume the slideshow
				if(!event.data.slide.is('.av-single-slide') && !event.data.slide.is('.av-loop-video'))
				{
					event.data.slide.trigger('reset');
					self._navigate( 'next' );  
					self.resume(); 
				}
				
				//safari 8 workaround for self hosted videos which wont loop by default
				if(event.data.slide.is('.av-loop-video') && event.data.slide.is('.av-video-service-html5'))
				{
					if($html.is('.avia-safari-8'))
					{
						setTimeout(function(){ event.data.slide.trigger('play'); },1);
					}
				}
			}
			
			function toggle( event )
			{
				if(event.target.tagName != "A") 
				{
					event.data.slide.trigger('toggle');
				}
			}
			
		},
		
		
		
		/************************************************************************
		Slideshow control functions
		*************************************************************************/
		
		_timer: function(callback, delay, first)
		{	
		    var self = this, start, remaining = delay;
			
			self.timerId = 0;
			
		    this.pause = function() {
		        window.clearTimeout(self.timerId);
		        remaining -= new Date() - start;
		    };

		    this.resume = function() {
		        start = new Date();
		        self.timerId = window.setTimeout(callback, remaining);
		    };

		    this.destroy = function()
		    {
		    	window.clearTimeout(self.timerId);
		    };

		    this.resume(true);
		},

		//start autorotation
		_startSlideshow: function()
		{
			var self = this;
			
			this.isPlaying = true;
			
			this.slideshow = new this._timer( function()
			{
				self._navigate( 'next' );
	
				if ( self.options.autoplay )
				{
					self._startSlideshow();
				}

			}, (this.options.interval * 1000));
		},

		//stop autorotation
		_stopSlideshow: function()
		{
			if ( this.options.autoplay ) {

				this.slideshow.destroy();
				this.isPlaying = false;
				this.options.autoplay = false;
			}
		},

		// public method: shows next image
		next : function(e)
		{
			e.preventDefault();
			this._stopSlideshow();
			this._navigate( 'next' );
		},

		// public method: shows previous image
		previous : function(e)
		{
			e.preventDefault();
			this._stopSlideshow();
			this._navigate( 'prev' );
		},

		// public method: goes to a specific image
		go2 : function( pos )
		{
			//if we didnt pass a number directly lets asume someone clicked on a link that triggered the goto transition
			if(isNaN(pos))
			{
				//in that case prevent the default link behavior and set the slide number to the links hash
				pos.preventDefault();
				pos = pos.currentTarget.hash.replace('#','');
			}

			pos -= 1;

			if( pos === this.current || pos >= this.itemsCount || pos < 0 )
			{
				return false;
			}

			this._stopSlideshow();
			this._navigate( false, pos );

		},

		// public method: starts the slideshow
		// any call to next(), previous() or goto() will stop the slideshow autoplay
		play : function()
		{
			if( !this.isPlaying )
			{
				this.isPlaying = true;

				this._navigate( 'next' );
				this.options.autoplay = true;
				this._startSlideshow();
			}

		},

		// public methos: pauses the slideshow
		pause : function()
		{
			if( this.isPlaying )
			{
				this.slideshow.pause();
			}
		},

		// publiccmethos: resumes the slideshow
		resume : function()
		{
			if( this.isPlaying )
			{
				this.slideshow.resume();
			}
		},

		// public methos: destroys the instance
		destroy : function( callback )
		{
			this.slideshow.destroy( callback );
		}

    }

    //simple wrapper to call the slideshow. makes sure that the slide data is not applied twice
    $.fn.aviaSlider = function( options )
    {
    	return this.each(function()
    	{
    		var self = $.data( this, 'aviaSlider' );

    		if(!self)
    		{
    			self = $.data( this, 'aviaSlider', new $.AviaSlider( options, this ) );
    		}
    	});
    }



})( jQuery );




// -------------------------------------------------------------------------------------------
// keyboard controls
// -------------------------------------------------------------------------------------------

(function($)
{
	"use strict";

	/************************************************************************
	keyboard arrow nav
	*************************************************************************/
	$.fn.avia_keyboard_controls = function(options_passed)
	{
		var defaults	=
		{
			37: '.prev-slide',	// prev
			39: '.next-slide'	// next
		},

		methods		= {

			mousebind: function(slider)
			{
				slider.hover(
					function(){  slider.mouseover	= true;  },
					function(){  slider.mouseover	= false; }
				);
			},

			keybind: function(slider)
			{
				$(document).keydown(function(e)
				{
					if(slider.mouseover && typeof slider.options[e.keyCode] !== 'undefined')
					{
						var item;

						if(typeof slider.options[e.keyCode] === 'string')
						{
							item = slider.find(slider.options[e.keyCode]);
						}
						else
						{
							item = slider.options[e.keyCode];
						}

						if(item.length)
						{
							item.trigger('click', ['keypress']);
							return false;
						}
					}
				});
			}
		};


		return this.each(function()
		{
			var slider			= $(this);
			slider.options		= $.extend({}, defaults, options_passed);
			slider.mouseover	= false;

			methods.mousebind(slider);
			methods.keybind(slider);

		});
	};


	/************************************************************************
	swipe nav
	*************************************************************************/
	$.fn.avia_swipe_trigger = function(passed_options)
	{
		var win		= $(window),
		isMobile	= $.avia_utilities.isMobile,
		defaults	=
		{
			prev: '.prev-slide',
			next: '.next-slide',
			event: {
				prev: 'click',
				next: 'click'
			}
		},

		methods = {

			activate_touch_control: function(slider)
			{
				var i, differenceX, differenceY;

				slider.touchPos = {};
				slider.hasMoved = false;

				slider.on('touchstart', function(event)
				{
					slider.touchPos.X = event.originalEvent.touches[0].clientX;
					slider.touchPos.Y = event.originalEvent.touches[0].clientY;
				});

				slider.on('touchend', function(event)
				{
					slider.touchPos = {};
	                if(slider.hasMoved) { event.preventDefault(); }
	                slider.hasMoved = false;
				});

				slider.on('touchmove', function(event)
				{
					if(!slider.touchPos.X)
					{
						slider.touchPos.X = event.originalEvent.touches[0].clientX;
						slider.touchPos.Y = event.originalEvent.touches[0].clientY;
					}
					else
					{
						differenceX = event.originalEvent.touches[0].clientX - slider.touchPos.X;
						differenceY = event.originalEvent.touches[0].clientY - slider.touchPos.Y;

						//check if user is scrolling the window or moving the slider
						if(Math.abs(differenceX) > Math.abs(differenceY))
						{
							event.preventDefault();

							if(slider.touchPos !== event.originalEvent.touches[0].clientX)
							{
								if(Math.abs(differenceX) > 50)
								{
									i = differenceX > 0 ? 'prev' : 'next';

									if(typeof slider.options[i] === 'string')
									{
										slider.find(slider.options[i]).trigger(slider.options.event[i], ['swipe']);
									}
									else
									{
										slider.options[i].trigger(slider.options.event[i], ['swipe']);
									}

									slider.hasMoved = true;
									slider.touchPos = {};
									return false;
								}
							}
						}
	                }
				});
			}
		};

		return this.each(function()
		{
			if(isMobile)
			{
				var slider	= $(this);

				slider.options	= $.extend({}, defaults, passed_options);

				methods.activate_touch_control(slider);
			}
		});
	};


}(jQuery));


// page init
jQuery(function(){
	initCycleCarousel();
	initMobileNav();
	initSameHeight();
	initCustomHover();
	initOpenClose();
	jQuery('input, textarea').placeholder();
});

// open-close init
function initOpenClose() {
	jQuery('.info-list li').openClose({
		activeClass: 'active',
		opener: '.opener',
		slider: '.slide',
		animSpeed: 400,
		effect: 'slide',
		onInit: function(self) {
			this.checkbox = self.holder.find('> :checkbox');
		},
		animStart: function(self) {
			console.log(this.checkbox);
			if (self && !this.checkbox.is(':checked')) {
				this.checkbox.prop('checked', true);
			}
		}
	});
}

// cycle scroll gallery init
function initCycleCarousel() {
	jQuery('.cycle-gallery').scrollAbsoluteGallery({
		mask: '.mask',
		slider: '.slideset',
		slides: '.slide',
		btnPrev: 'a.btn-prev',
		btnNext: 'a.btn-next',
		generatePagination: '.pagination',
		stretchSlideToMask: true,
		pauseOnHover: true,
		maskAutoSize: true,
		autoRotation: true,
		switchTime: 4000,
		animSpeed: 500
	});
}

// mobile menu init
function initMobileNav() {
	jQuery('#nav').mobileNav({
		hideOnClickOutside: true,
		menuActiveClass: 'active',
		menuOpener: '.opener',
		menuDrop: '.drop'
	});
	jQuery('#sidebar').mobileNav({
		hideOnClickOutside: true,
		menuActiveClass: 'active',
		menuOpener: '.opener',
		menuDrop: '.aside-nav'
	});
}

// align blocks height
function initSameHeight() {
	jQuery('.box-area').sameHeight({
		elements: '.col-holder',
		flexible: true,
		multiLine: true,
		biggestHeight: true
	});
}

// add classes on hover/touch
function initCustomHover() {
	jQuery('.person-info-area .photo a').touchHover();
	jQuery('.person-info-area .social li').touchHover();
}

/*
 * jQuery Open/Close plugin
 */
;(function($) {
	function OpenClose(options) {
		this.options = $.extend({
			addClassBeforeAnimation: true,
			hideOnClickOutside: false,
			activeClass:'active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 400,
			effect:'fade',
			event:'click'
		}, options);
		this.init();
	}
	OpenClose.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			this.holder = $(this.options.holder);
			this.opener = this.holder.find(this.options.opener);
			this.slider = this.holder.find(this.options.slider);
		},
		attachEvents: function() {
			// add handler
			var self = this;
			this.eventHandler = function(e) {
				e.preventDefault();
				if (self.slider.hasClass(slideHiddenClass)) {
					self.showSlide();
				} else {
					self.hideSlide();
				}
			};
			self.opener.bind(self.options.event, this.eventHandler);

			// hover mode handler
			if(self.options.event === 'over') {
				self.opener.bind('mouseenter', function() {
					self.showSlide();
				});
				self.holder.bind('mouseleave', function() {
					self.hideSlide();
				});
			}

			// outside click handler
			self.outsideClickHandler = function(e) {
				if(self.options.hideOnClickOutside) {
					var target = $(e.target);
					if (!target.is(self.holder) && !target.closest(self.holder).length) {
						self.hideSlide();
					}
				}
			};

			// set initial styles
			if (this.holder.hasClass(this.options.activeClass)) {
				$(document).bind('click touchstart', self.outsideClickHandler);
			} else {
				this.slider.addClass(slideHiddenClass);
			}
		},
		showSlide: function() {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.addClass(self.options.activeClass);
			}
			self.slider.removeClass(slideHiddenClass);
			$(document).bind('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', true);
			toggleEffects[self.options.effect].show({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function() {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.addClass(self.options.activeClass);
					}
					self.makeCallback('animEnd', true);
				}
			});
		},
		hideSlide: function() {
			var self = this;
			if (self.options.addClassBeforeAnimation) {
				self.holder.removeClass(self.options.activeClass);
			}
			$(document).unbind('click touchstart', self.outsideClickHandler);

			self.makeCallback('animStart', false);
			toggleEffects[self.options.effect].hide({
				box: self.slider,
				speed: self.options.animSpeed,
				complete: function() {
					if (!self.options.addClassBeforeAnimation) {
						self.holder.removeClass(self.options.activeClass);
					}
					self.slider.addClass(slideHiddenClass);
					self.makeCallback('animEnd', false);
				}
			});
		},
		destroy: function() {
			this.slider.removeClass(slideHiddenClass).css({display:''});
			this.opener.unbind(this.options.event, this.eventHandler);
			this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
			$(document).unbind('click touchstart', this.outsideClickHandler);
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};

	// add stylesheet for slide on DOMReady
	var slideHiddenClass = 'js-slide-hidden';
	(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.' + slideHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	}());

	// animation effects
	var toggleEffects = {
		slide: {
			show: function(o) {
				o.box.stop(true).hide().slideDown(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.stop(true).slideUp(o.speed, o.complete);
			}
		},
		fade: {
			show: function(o) {
				o.box.stop(true).hide().fadeIn(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.stop(true).fadeOut(o.speed, o.complete);
			}
		},
		none: {
			show: function(o) {
				o.box.hide().show(0, o.complete);
			},
			hide: function(o) {
				o.box.hide(0, o.complete);
			}
		}
	};

	// jQuery plugin interface
	$.fn.openClose = function(opt) {
		return this.each(function() {
			jQuery(this).data('OpenClose', new OpenClose($.extend(opt, {holder: this})));
		});
	};
}(jQuery));

/*
 * jQuery Cycle Carousel plugin
 */
;(function($){
	function ScrollAbsoluteGallery(options) {
		this.options = $.extend({
			activeClass: 'active',
			mask: 'div.slides-mask',
			slider: '>ul',
			slides: '>li',
			btnPrev: '.btn-prev',
			btnNext: '.btn-next',
			pagerLinks: 'ul.pager > li',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			galleryReadyClass: 'gallery-js-ready',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			maskAutoSize: false,
			autoRotation: false,
			pauseOnHover: false,
			stretchSlideToMask: false,
			switchTime: 3000,
			animSpeed: 500,
			handleTouch: true,
			swipeThreshold: 15,
			vertical: false
		}, options);
		this.init();
	}
	ScrollAbsoluteGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			// find structure elements
			this.holder = $(this.options.holder).addClass(this.options.galleryReadyClass);
			this.mask = this.holder.find(this.options.mask);
			this.slider = this.mask.find(this.options.slider);
			this.slides = this.slider.find(this.options.slides);
			this.btnPrev = this.holder.find(this.options.btnPrev);
			this.btnNext = this.holder.find(this.options.btnNext);

			// slide count display
			this.currentNumber = this.holder.find(this.options.currentNumber);
			this.totalNumber = this.holder.find(this.options.totalNumber);

			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.pagerLinks = this.buildPagination();
			} else {
				this.pagerLinks = this.holder.find(this.options.pagerLinks);
			}

			// define index variables
			this.sizeProperty = this.options.vertical ? 'height' : 'width';
			this.positionProperty = this.options.vertical ? 'top' : 'left';
			this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';

			this.slideSize = this.slides[this.sizeProperty]();
			this.currentIndex = 0;
			this.prevIndex = 0;

			// reposition elements
			this.options.maskAutoSize = this.options.vertical ? false : this.options.maskAutoSize;
			if(this.options.vertical) {
				this.mask.css({
					height: this.slides.innerHeight()
				});
			}
			if(this.options.maskAutoSize){
				this.mask.css({
					height: this.slider.height()
				});
			}
			this.slider.css({
				position: 'relative',
				height: this.options.vertical ? this.slideSize * this.slides.length : '100%'
			});
			this.slides.css({
				position: 'absolute'
			}).css(this.positionProperty, -9999).eq(this.currentIndex).css(this.positionProperty, 0);
			this.refreshState();
		},
		buildPagination: function() {
			var pagerLinks = $();
			if(!this.pagerHolder) {
				this.pagerHolder = this.holder.find(this.options.generatePagination);
			}
			if(this.pagerHolder.length) {
				this.pagerHolder.empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.slides.length; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				pagerLinks = this.pagerList.children();
			}
			return pagerLinks;
		},
		attachEvents: function() {
			// attach handlers
			var self = this;
			if(this.btnPrev.length) {
				this.btnPrevHandler = function(e) {
					e.preventDefault();
					self.prevSlide();
				};
				this.btnPrev.click(this.btnPrevHandler);
			}
			if(this.btnNext.length) {
				this.btnNextHandler = function(e) {
					e.preventDefault();
					self.nextSlide();
				};
				this.btnNext.click(this.btnNextHandler);
			}
			if(this.pagerLinks.length) {
				this.pagerLinksHandler = function(e) {
					e.preventDefault();
					self.numSlide(self.pagerLinks.index(e.currentTarget));
				};
				this.pagerLinks.click(this.pagerLinksHandler);
			}

			// handle autorotation pause on hover
			if(this.options.pauseOnHover) {
				this.hoverHandler = function() {
					clearTimeout(self.timer);
				};
				this.leaveHandler = function() {
					self.autoRotate();
				};
				this.holder.bind({mouseenter: this.hoverHandler, mouseleave: this.leaveHandler});
			}

			// handle holder and slides dimensions
			this.resizeHandler = function() {
				if(!self.animating) {
					if(self.options.stretchSlideToMask) {
						self.resizeSlides();
					}
					self.resizeHolder();
					self.setSlidesPosition(self.currentIndex);
				}
			};
			$(window).bind('load resize orientationchange', this.resizeHandler);
			if(self.options.stretchSlideToMask) {
				self.resizeSlides();
			}

			// handle swipe on mobile devices
			if(this.options.handleTouch && window.Hammer && this.mask.length && this.slides.length > 1 && isTouchDevice) {
				this.swipeHandler = new Hammer.Manager(this.mask[0]);
				this.swipeHandler.add(new Hammer.Pan({
					direction: self.options.vertical ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
					threshold: self.options.swipeThreshold
				}));

				this.swipeHandler.on('panstart', function() {
					if(self.animating) {
						self.swipeHandler.stop();
					} else {
						clearTimeout(self.timer);
					}
				}).on('panmove', function(e) {
					self.swipeOffset = -self.slideSize + e[self.options.vertical ? 'deltaY' : 'deltaX'];
					self.slider.css(self.animProperty, self.swipeOffset);
					clearTimeout(self.timer);
				}).on('panend', function(e) {
					if(e.distance > self.options.swipeThreshold) {
						if(e.offsetDirection === Hammer.DIRECTION_RIGHT || e.offsetDirection === Hammer.DIRECTION_DOWN) {
							self.nextSlide();
						} else {
							self.prevSlide();
						}
					} else {
						var tmpObj = {};
						tmpObj[self.animProperty] = -self.slideSize;
						self.slider.animate(tmpObj, {duration: self.options.animSpeed});
						self.autoRotate();
					}
					self.swipeOffset = 0;
				});
			}

			// start autorotation
			this.autoRotate();
			this.resizeHolder();
			this.setSlidesPosition(this.currentIndex);
		},
		resizeSlides: function() {
			this.slideSize = this.mask[this.options.vertical ? 'height' : 'width']();
			this.slides.css(this.sizeProperty, this.slideSize);
		},
		resizeHolder: function() {
			if(this.options.maskAutoSize) {
				this.mask.css({
					height: this.slides.eq(this.currentIndex).outerHeight(true)
				});
			}
		},
		prevSlide: function() {
			if(!this.animating && this.slides.length > 1) {
				this.direction = -1;
				this.prevIndex = this.currentIndex;
				if(this.currentIndex > 0) this.currentIndex--;
				else this.currentIndex = this.slides.length - 1;
				this.switchSlide();
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!this.animating && this.slides.length > 1) {
				this.direction = 1;
				this.prevIndex = this.currentIndex;
				if(this.currentIndex < this.slides.length - 1) this.currentIndex++;
				else this.currentIndex = 0;
				this.switchSlide();
			}
		},
		numSlide: function(c) {
			if(!this.animating && this.currentIndex !== c && this.slides.length > 1) {
				this.direction = c > this.currentIndex ? 1 : -1;
				this.prevIndex = this.currentIndex;
				this.currentIndex = c;
				this.switchSlide();
			}
		},
		preparePosition: function() {
			// prepare slides position before animation
			this.setSlidesPosition(this.prevIndex, this.direction < 0 ? this.currentIndex : null, this.direction > 0 ? this.currentIndex : null, this.direction);
		},
		setSlidesPosition: function(index, slideLeft, slideRight, direction) {
			// reposition holder and nearest slides
			if(this.slides.length > 1) {
				var prevIndex = (typeof slideLeft === 'number' ? slideLeft : index > 0 ? index - 1 : this.slides.length - 1);
				var nextIndex = (typeof slideRight === 'number' ? slideRight : index < this.slides.length - 1 ? index + 1 : 0);

				this.slider.css(this.animProperty, this.swipeOffset ? this.swipeOffset : -this.slideSize);
				this.slides.css(this.positionProperty, -9999).eq(index).css(this.positionProperty, this.slideSize);
				if(prevIndex === nextIndex && typeof direction === 'number') {
					var calcOffset = direction > 0 ? this.slideSize*2 : 0;
					this.slides.eq(nextIndex).css(this.positionProperty, calcOffset);
				} else {
					this.slides.eq(prevIndex).css(this.positionProperty, 0);
					this.slides.eq(nextIndex).css(this.positionProperty, this.slideSize*2);
				}
			}
		},
		switchSlide: function() {
			// prepare positions and calculate offset
			var self = this;
			var oldSlide = this.slides.eq(this.prevIndex);
			var newSlide = this.slides.eq(this.currentIndex);
			this.animating = true;

			// resize mask to fit slide
			if(this.options.maskAutoSize) {
				this.mask.animate({
					height: newSlide.outerHeight(true)
				}, {
					duration: this.options.animSpeed
				});
			}

			// start animation
			var animProps = {};
			animProps[this.animProperty] = this.direction > 0 ? -this.slideSize*2 : 0;
			this.preparePosition();
			this.slider.animate(animProps,{duration:this.options.animSpeed, complete:function() {
				self.setSlidesPosition(self.currentIndex);

				// start autorotation
				self.animating = false;
				self.autoRotate();

				// onchange callback
				self.makeCallback('onChange', self);
			}});

			// refresh classes
			this.refreshState();

			// onchange callback
			this.makeCallback('onBeforeChange', this);
		},
		refreshState: function(initial) {
			// slide change function
			this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);

			// display current slide number
			this.currentNumber.html(this.currentIndex + 1);
			this.totalNumber.html(this.slides.length);

			// add class if not enough slides
			this.holder.toggleClass('not-enough-slides', this.slides.length === 1);
		},
		autoRotate: function() {
			var self = this;
			clearTimeout(this.timer);
			if(this.options.autoRotation) {
				this.timer = setTimeout(function() {
					self.nextSlide();
				}, this.options.switchTime);
			}
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},
		destroy: function() {
			// destroy handler
			this.btnPrev.unbind('click', this.btnPrevHandler);
			this.btnNext.unbind('click', this.btnNextHandler);
			this.pagerLinks.unbind('click', this.pagerLinksHandler);
			this.holder.unbind('mouseenter', this.hoverHandler);
			this.holder.unbind('mouseleave', this.leaveHandler);
			$(window).unbind('load resize orientationchange', this.resizeHandler);
			clearTimeout(this.timer);

			// destroy swipe handler
			if(this.swipeHandler) {
				this.swipeHandler.destroy();
			}

			// remove inline styles, classes and pagination
			this.holder.removeClass(this.options.galleryReadyClass);
			this.slider.add(this.slides).removeAttr('style');
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder.empty();
			}
		}
	};

	// detect device type
	var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	// jquery plugin
	$.fn.scrollAbsoluteGallery = function(opt){
		return this.each(function(){
			$(this).data('ScrollAbsoluteGallery', new ScrollAbsoluteGallery($.extend(opt,{holder:this})));
		});
	};
}(jQuery));

/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {container: this}),
				instance = new MobileNav(params);
			$.data(this, 'MobileNav', instance);
		});
	};
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;(function($){
	$.fn.sameHeight = function(opt) {
		var options = $.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false,
			biggestHeight: false
		},opt);
		return this.each(function(){
			var holder = $(this), postResizeTimer, ignoreResize;
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;

			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();

			// handle flexible layout / font resize
			var delayedResizeHandler = function() {
				if(!ignoreResize) {
					ignoreResize = true;
					doResize();
					clearTimeout(postResizeTimer);
					postResizeTimer = setTimeout(function() {
						doResize();
						setTimeout(function(){
							ignoreResize = false;
						}, 10);
					}, 100);
				}
			};

			// handle flexible/responsive layout
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', delayedResizeHandler);
			}

			// handle complete page load including images and fonts
			$(window).bind('load', delayedResizeHandler);
		});
	};

	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
		}
		if(options.biggestHeight) {
			boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
		}
	}

	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}

	// resize helper function
	function resizeElements(boxes, parent, options) {
		var calcHeight;
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = $(this);
			var depthDiffHeight = 0;
			var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = $(this);
					if(parent.is(this)) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			calcHeight = parentHeight - depthDiffHeight;
			calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
		return calcHeight;
	}
}(jQuery));

/*
 * Mobile hover plugin
 */
;(function($){

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
		isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);

	// define events
	var eventOn = (isTouchDevice && 'touchstart') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerdown') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerDown') || 'mouseenter',
		eventOff = (isTouchDevice && 'touchend') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerup') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerUp') || 'mouseleave';

	// event handlers
	var toggleOn, toggleOff, preventHandler;
	if(isTouchDevice || isWinPhoneDevice) {
		// prevent click handler
		preventHandler = function(e) {
			e.preventDefault();
		};

		// touch device handlers
		toggleOn = function(e) {
			var options = e.data, element = $(this);

			var toggleOff = function(e) {
				var target = $(e.target);
				if (!target.is(element) && !target.closest(element).length) {
					element.removeClass(options.hoverClass);
					element.off('click', preventHandler);
					if(options.onLeave) options.onLeave(element);
					$(document).off(eventOn, toggleOff);
				}
			};

			if(!element.hasClass(options.hoverClass)) {
				element.addClass(options.hoverClass);
				element.one('click', preventHandler);
				$(document).on(eventOn, toggleOff);
				if(options.onHover) options.onHover(element);
			}
		};
	} else {
		// desktop browser handlers
		toggleOn = function(e) {
			var options = e.data, element = $(this);
			element.addClass(options.hoverClass);
			$(options.context).on(eventOff, options.selector, options, toggleOff);
			if(options.onHover) options.onHover(element);
		};
		toggleOff = function(e) {
			var options = e.data, element = $(this);
			element.removeClass(options.hoverClass);
			$(options.context).off(eventOff, options.selector, toggleOff);
			if(options.onLeave) options.onLeave(element);
		};
	}

	// jQuery plugin
	$.fn.touchHover = function(opt) {
		var options = $.extend({
			context: this.context,
			selector: this.selector,
			hoverClass: 'hover'
		}, opt);

		$(this.context).on(eventOn, this.selector, options, toggleOn);
		return this;
	};
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
	$(function() {
		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');

		// use native IE resize event if possible
		if (window.attachEvent && !window.addEventListener) {
			resizeFrame.bind('resize', function () {
				$.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
			});
		}
		// use script inside the iframe to detect resize for other browsers
		else {
			var doc = resizeFrame[0].contentWindow.document;
			doc.open();
			doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
			doc.close();
		}
		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (err) {}
	}

}(this, document, jQuery));


// page init
bindReady(function(){
	initTouchNav();
});

// handle dropdowns on mobile devices
function initTouchNav() {
	lib.each(lib.queryElementsBySelector('nav.menu'), function(){
		new TouchNav({
			navBlock: this,
			menuDrop: 'form.login-form'
		});
	});
}

// navigation accesibility module
function TouchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'ul',
		navBlock: null
	};
	for(var p in opt) {
		if(opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
TouchNav.isActiveOn = function(elem) {
	return elem && elem.touchNavActive;
};
TouchNav.prototype = {
	init: function() {
		if(typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if(typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if(this.menu) {
			this.addEvents();
		}
	},
	addEvents: function() {
		// attach event handlers
		var self = this;
		var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
		this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

		var initMenuItem = function(item) {
			var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
				currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

			// only for touch input devices
			if( currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice) ) {
				lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
				lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
				lib.event.add(currentOpener, touchEvent, function(e){
					if( !self.isTouchPointerEvent(e) ) {
						self.preventCurrentClick = false;
						return;
					}
					self.touchFlag = true;
					self.currentItem = item;
					self.currentLink = currentOpener;
					self.pressHandler.apply(self, arguments);
				});
			}
			// for desktop computers and touch devices
			lib.event.add(item, 'mouseover', function(){
				if(!self.touchFlag) {
					self.currentItem = item;
					self.mouseoverHandler();
				}
			});
			lib.event.add(item, 'mouseout', function(){
				if(!self.touchFlag) {
					self.currentItem = item;
					self.mouseoutHandler();
				}
			});
			item.touchNavActive = true;
		};

		// addd handlers for all menu items
		for(var i = 0; i < this.menuItems.length; i++) {
			initMenuItem(self.menuItems[i]);
		}

		// hide dropdowns when clicking outside navigation
		if(this.isTouchDevice || this.isPointerDevice) {
			lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
			lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
		}
	},
	mousedownHandler: function(e) {
		if(this.touchFlag) {
			e.preventDefault();
			this.touchFlag = false;
			this.preventCurrentClick = false;
		}
	},
	mouseoverHandler: function() {
		lib.addClass(this.currentItem, this.options.hoverClass);
	},
	mouseoutHandler: function() {
		lib.removeClass(this.currentItem, this.options.hoverClass);
	},
	hideActiveDropdown: function() {
		for(var i = 0; i < this.menuItems.length; i++) {
			if(lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
				lib.removeClass(this.menuItems[i], this.options.hoverClass);
			}
		}
		this.activeParent = null;
	},
	pressHandler: function(e) {
		// hide previous drop (if active)
		if(this.currentItem !== this.activeParent) {
			if(this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
				lib.removeClass(this.activeParent, this.options.hoverClass);
			} else if(!this.isParent(this.activeParent, this.currentLink)) {
				this.hideActiveDropdown();
			}
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if(lib.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			e.preventDefault();
			this.preventCurrentClick = true;
			lib.addClass(this.currentItem, this.options.hoverClass);
		}
	},
	clickHandler: function(e) {
		// prevent first click on link
		if(this.preventCurrentClick) {
			e.preventDefault();
		}
	},
	clickOutsideHandler: function(event) {
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if(this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
			this.touchFlag = false;
		}
	},
	isParent: function(parent, child) {
		while(child.parentNode) {
			if(child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchPointerEvent: function(e) {
		return (e.type.indexOf('touch') > -1) ||
				(navigator.pointerEnabled && e.pointerType === 'touch') ||
				(navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
	},
	isPointerDevice: (function() {
		return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
	}()),
	isTouchDevice: (function() {
		return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	}())
};

/*
 * Utility module
 */
lib = {
	hasClass: function(el,cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	},
	addClass: function(el,cls) {
		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
	},
	removeClass: function(el,cls) {
		if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	},
	extend: function(obj) {
		for(var i = 1; i < arguments.length; i++) {
			for(var p in arguments[i]) {
				if(arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	each: function(obj, callback) {
		var property, len;
		if(typeof obj.length === 'number') {
			for(property = 0, len = obj.length; property < len; property++) {
				if(callback.call(obj[property], property, obj[property]) === false) {
					break;
				}
			}
		} else {
			for(property in obj) {
				if(obj.hasOwnProperty(property)) {
					if(callback.call(obj[property], property, obj[property]) === false) {
						break;
					}
				}
			}
		}
	},
	event: (function() {
		var fixEvent = function(e) {
			e = e || window.event;
			if(e.isFixed) return e; else e.isFixed = true;
			if(!e.target) e.target = e.srcElement;
			e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
			e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
			return e;
		};
		return {
			add: function(elem, event, handler) {
				if(!elem.events) {
					elem.events = {};
					elem.handle = function(e) {
						var ret, handlers = elem.events[e.type];
						e = fixEvent(e);
						for(var i = 0, len = handlers.length; i < len; i++) {
							if(handlers[i]) {
								ret = handlers[i].call(elem, e);
								if(ret === false) {
									e.preventDefault();
									e.stopPropagation();
								}
							}
						}
					};
				}
				if(!elem.events[event]) {
					elem.events[event] = [];
					if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
					else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
				}
				elem.events[event].push(handler);
			},
			remove: function(elem, event, handler) {
				var handlers = elem.events[event];
				for(var i = handlers.length - 1; i >= 0; i--) {
					if(handlers[i] === handler) {
						handlers.splice(i,1);
					}
				}
				if(!handlers.length) {
					delete elem.events[event];
					if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
					else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
				}
			}
		};
	}()),
	queryElementsBySelector: function(selector, scope) {
		scope = scope || document;
		if(!selector) return [];
		if(selector === '>*') return scope.children;
		if(typeof document.querySelectorAll === 'function') {
			return scope.querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for(var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (element && tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = element ? [element] : [];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default : checkFunction = function(e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList,currentContext);
		}
		return resultList;
	},
	trim: function (str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	},
	bind: function(f, scope, forceArgs){
		return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
	}
};

// DOM ready handler
function bindReady(handler){
	var called = false;
	var ready = function() {
		if (called) return;
		called = true;
		handler();
	};
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', ready, false);
	} else if (document.attachEvent) {
		if (document.documentElement.doScroll && window == window.top) {
			var tryScroll = function(){
				if (called) return;
				if (!document.body) return;
				try {
					document.documentElement.doScroll('left');
					ready();
				} catch(e) {
					setTimeout(tryScroll, 0);
				}
			};
			tryScroll();
		}
		document.attachEvent('onreadystatechange', function(){
			if (document.readyState === 'complete') {
				ready();
			}
		});
	}
	if (window.addEventListener) window.addEventListener('load', ready, false);
	else if (window.attachEvent) window.attachEvent('onload', ready);
}


/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
if(Object.create){!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");}

