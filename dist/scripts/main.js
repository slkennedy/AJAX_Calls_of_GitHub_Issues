var token = "0c1c148a720b6200ce423c085c3633a6cb2f908d";

$.ajaxSetup({
  headers: {
    "Authorization": "token " + token
  }
});
function reusableFunction(container, templateID, model) {
    var templateFunction = _.template($('#' + templateID).text());
    var renderTemplate = templateFunction(model);
    $(container).append(renderTemplate);
}

$.ajax("https://api.github.com/issues", {
    type: 'GET',
    datatype: 'json'
}).done(function(issues) {
    _.each(issues, function(issue) {
        reusableFunction('.list-items', 'template-list', issue);
    });

});

setInterval (function(){
	$(document).on('click', '.titlelink', function() {
		var title = $(this).text();
	    $.ajax({
	        type: 'GET',
	        datatype: 'json',
	        url: $(this).attr('data-id')
	    }).done(function(issues) {
	    	console.log(issues)
		       _.each(issues, function(issue) {
	        	issue.commentTitle = title;
	            reusableFunction('.list-details', 'template-details', issue)
        	});
    	});
	});
}, 10000);
