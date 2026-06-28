"use strict";


/* ====== Define JS Constants ====== */
const sidebarToggler = document.getElementById('docs-sidebar-toggler');
const sidebar = document.getElementById('docs-sidebar');
const sidebarLinks = document.querySelectorAll('#docs-sidebar .scrollto');



/* ===== Responsive Sidebar ====== */

window.onload=function() 
{ 
    responsiveSidebar(); 
};

window.onresize=function() 
{ 
    responsiveSidebar(); 
};


function responsiveSidebar() {
    let w = window.innerWidth;
	if(w >= 1200) {
	    // if larger 
	    console.log('larger');
		sidebar.classList.remove('sidebar-hidden');
		sidebar.classList.add('sidebar-visible');
		
	} else {
	    // if smaller
	    console.log('smaller');
	    sidebar.classList.remove('sidebar-visible');
		sidebar.classList.add('sidebar-hidden');
	}
};

sidebarToggler.addEventListener('click', () => {
	if (sidebar.classList.contains('sidebar-visible')) {
		console.log('visible');
		sidebar.classList.remove('sidebar-visible');
		sidebar.classList.add('sidebar-hidden');
		
	} else {
		console.log('hidden');
		sidebar.classList.remove('sidebar-hidden');
		sidebar.classList.add('sidebar-visible');
	}
});


/* ===== Smooth scrolling ====== */
/*  Note: You need to include smoothscroll.min.js (smooth scroll behavior polyfill) on the page to cover some browsers */
/* Ref: https://github.com/iamdustan/smoothscroll */

sidebarLinks.forEach((sidebarLink) => {
	
	sidebarLink.addEventListener('click', (e) => {
		
		e.preventDefault();
		
		var target = sidebarLink.getAttribute("href").replace('#', '');
		
		//console.log(target);
		
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        
        
        //Collapse sidebar after clicking
		if (sidebar.classList.contains('sidebar-visible') && window.innerWidth < 1200){
			
			sidebar.classList.remove('sidebar-visible');
		    sidebar.classList.add('sidebar-hidden');
		} 
		
    });
	
});


/* ===== Gumshoe SrollSpy ===== */
/* Ref: https://github.com/cferdinandi/gumshoe  */
// Initialize Gumshoe
var spy = new Gumshoe('#docs-nav a', {
	offset: 69, //sticky header height
});


/* ====== SimpleLightbox Plugin ======= */
/*  Ref: https://github.com/andreknieriem/simplelightbox */

var lightbox = new SimpleLightbox('.simplelightbox-gallery a', {/* options */});

// highlight.js
document.addEventListener('DOMContentLoaded', (event) => {
	document.querySelectorAll('pre code').forEach((block) => {
		hljs.highlightElement(block);
	});
});

// copy code

// document.querySelector('.copy-btn').addEventListener('click', function() {
// 	// Get the code block text
// 	const codeToCopy = document.getElementById('codeToCopy').innerText;

// 	// Copy the code to the clipboard
// 	navigator.clipboard.writeText(codeToCopy).then(() => {
// 		// Show a confirmation or change the button text temporarily
// 		const originalText = this.innerText;
// 		this.innerText = 'Copied!';
// 		setTimeout(() => {
// 			this.innerText = originalText;
// 		}, 2000);
// 	}).catch(err => {
// 		console.error('Failed to copy text: ', err);
// 	});
// });

  // Get all buttons with the class 'copy-btn'
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Add event listeners to each button
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the code block ID from the data attribute
      const codeId = this.getAttribute('data-code');
      const codeToCopy = document.getElementById(codeId).innerText.trim();

      // Copy the code to the clipboard
      navigator.clipboard.writeText(codeToCopy).then(() => {
        // Show a confirmation or change the button text temporarily
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fa fa-check me-1"></i>Copied!';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });


// search
// Search function
function searchDocs(query) {
    const pages = ['index.html', 'installation.html', 'api.html', 'integration.html']; // Add all the page URLs here
    const results = [];

    pages.forEach(page => {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                // Create a DOM parser to parse the HTML content
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Search for the query in the page content
                const content = doc.body.textContent.toLowerCase();
                const searchQuery = query.toLowerCase();

                if (content.includes(searchQuery)) {
                    const sectionTitles = doc.querySelectorAll('.section-heading, .docs-heading');
                    sectionTitles.forEach(title => {
                        if (title.textContent.toLowerCase().includes(searchQuery)) {
                            results.push({
                                title: title.textContent,
                                page: page,
                                sectionId: title.id || title.closest('section').id
                            });
                        }
                    });
                }

                // Display search results
                displayResults(results);
            })
            .catch(error => console.log('Error loading page:', error));
    });
}

// Function to display search results
function displayResults(results) {
    const resultsContainer = document.querySelector('#search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result');
            resultItem.innerHTML = `<a href="${result.page}#${result.sectionId}">${result.title} - ${result.page}</a>`;
            resultsContainer.appendChild(resultItem);
        });
    }
}

// Event listener for the search form
document.querySelector('.search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input').value;
    searchDocs(searchInput);
});


















