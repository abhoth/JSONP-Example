
var App = {
    
	page: 1,
	etsyOffset: 0,
    api_key:"zs0b34pkyg8a94huf0mrlsm2",
	   
	jsonp: function(url) {  
      var script = document.createElement("script"); // Creates the JSONP script tag
      script.type = "text/javascript";
      script.src = url; // Sets the url to the Etsy API 
      document.getElementsByTagName('head')[0].appendChild(script); // Imbeds script tag into HTML
	  return;
	},
	createNextButton: function(url){ // An anchor creation helper function
		var btn = document.createElement('input'); // Creates an anchor
		btn.setAttribute('type','button'); 
		btn.setAttribute('value','Show more results');
		btn.setAttribute('id','btnNext');
		return btn;
		
	},
	createContainer: function(){ // An container creation helper function
		var container = document.createElement('div'); // Creates a containing div
		container.classList.add('col-md-1'); // Add Bootstrap classes
		container.classList.add('col-sm-2');
		container.classList.add('col-xs-4');
		container.classList.add('listing');
		return container;
	},
	
	createImage: function(url){ // An image creation helper function
		var imageTag = document.createElement('img'); // Creates the image tag
		imageTag.src = url; // Sets the url to the Etsy Image url
		return imageTag;
		
	},
	
	createTitle: function(title){ // A title tag creation helper function
		var titleTag = document.createElement('h5'); // Creates a containing heading
		titleTag.innerHTML = title; // Sets the title in the heading
		return titleTag;
		
	},
	
	createLink: function(url){ // An anchor creation helper function
		var linkTag = document.createElement('a'); // Creates an anchor
		linkTag.setAttribute('href',url); // Sets href to Etsy
		linkTag.setAttribute('target','_blank'); // Opens link in new tab
		return linkTag;
		
	},
	
	createListing: function(imageURL, title, url){ // Master listing builder
		
		var container = App.createContainer(); // Creates container by calling helper function
		var link = App.createLink(url); // Creates the link by calling the helper function
		
		link.appendChild(App.createImage(imageURL)); // Puts the image in the anchor
		container.appendChild(link); // Puts the anchor with image in the container
		container.appendChild(App.createTitle(title.substr(0,18) + '...')); // Puts the Title in the container
		
		return container;
		
	},
	
	buildEtsyUrl: function(terms, offset,apikey){
		
		var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?callback=getData&keywords="+
                terms+"&limit=24&offset="+ offset.toString() + "&includes=Images:1&api_key="+apikey;
		
		return etsyURL;
	},
	
	paginate: function(){
	
	    App.etsyOffset = App.page * 24;
		App.page = App.page + 1;
	    var etsyURL = App.buildEtsyUrl(terms.value, App.etsyOffset, App.api_key);	
	    App.jsonp(etsyURL);
		
		return; 	
		
	},
	
    callAPI:function(){
		
		   
           terms = document.getElementById('etsyTerms'); // The user input
				
		   getData = function(data){
				
			   var x;      
			   
			   if (data.ok) {
                console.log(data);
				 if (data.results.length == 0){
					document.getElementById('results').innerHTML = "No results"; // Message for no results
				 }else{
					document.getElementById('results').innerHTML = data.count +  " results";
				
				  for (x=0;x<data.results.length;x++){
					
					document.getElementsByTagName('div')[0].appendChild(App.createListing(data.results[x].Images[0].url_75x75,data.results[x].title, data.results[x].url));
					
				  }
				  
				  if  (data.count > 24){
					  
					  if(!document.getElementById('btnNext')){
						  
						    document.getElementById('paginationBtn').appendChild(App.createNextButton());
					        document.getElementById('btnNext').addEventListener('click', function(){
						  
					        App.paginate();

						  
						  });
					  }
					
				  }
				  
				 }
				  
        	   } else {
      	         
				  alert(data.error);
     		    
			   }
				
		    };
				
				
            var etsyURL = App.buildEtsyUrl(terms.value, App.etsyOffset, App.api_key);
                
		
			App.jsonp(etsyURL); // Call the JSONP constructor


            return false;
		
	},
	
	
	init: function(){
		
		
		var btn = document.getElementById('etsySearch'); 
		
		btn.addEventListener('click', function() { // Click event
			
			document.getElementsByTagName('div')[0].innerHTML = ""; // Clears the root div node's contents
			App.callAPI(); // Calls the API
			
			});
		document.getElementById('etsyTerms').addEventListener('keypress', function (e) {
    		var key = e.which || e.keyCode;
    		if (key === 13) { 
			    document.getElementsByTagName('div')[0].innerHTML = "";
  			    App.callAPI(); 
			}
		});
	}

	

    
}

document.addEventListener("DOMContentLoaded", function() {
  App.init();
});

