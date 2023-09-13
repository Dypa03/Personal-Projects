document.addEventListener("DOMContentLoaded", function () {
    const pokemonImages = document.querySelectorAll(".pokemon");
    const dropZones = document.querySelectorAll(".drop-zone");
    const pokemonList = document.querySelector("#pokemon-list");
    let screenWidthInt = window.innerWidth;

    // OVERLAY
    function showOverlay() {
        // Create and display a semi-transparent overlay
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);

        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    }

    // Function to hide the overlay
    function hideOverlay() {
        // Remove the overlay element
        const overlay = document.querySelector(".overlay");
        if (overlay) {
            overlay.remove();
        }
    }

    // Add dragstart event listeners to Pokemon images
    pokemonImages.forEach((pokemonImage) => {
        pokemonImage.addEventListener("dragstart", (event) => {
            // Set the dragged data to the Pokemon's ID
            event.dataTransfer.setData("text/plain", event.target.dataset.id);
        });
    });

    // DROP ZONES
    // Function to set drop zone height
    function setGridHeight(dropZone, rowImages, limit) {
        if (rowImages.length < limit) {
            dropZone.style.height = "90px";
        } else if (limit <= rowImages.length && rowImages.length < limit * 2) {
            dropZone.style.height = "180px";
        } else if (limit * 2 <= rowImages.length && rowImages.length < limit * 3) {
            dropZone.style.height = "270px";
        } else {
            dropZone.style.height = "360px";
        }
    }


    // Function to update drop zone height based on screen width
    function updateDropZoneHeight(dropZone, rowImages, limit) {
        if (screenWidthInt >= 1430) {
            setGridHeight(dropZone, rowImages, limit);
        } else if (screenWidthInt >= 1300) {
            setGridHeight(dropZone, rowImages, limit - 1);
        } else if (screenWidthInt >= 1175) {
            setGridHeight(dropZone, rowImages, limit - 2);
        } else if (screenWidthInt >= 1040) {
            setGridHeight(dropZone, rowImages, limit - 3);
        } else if (screenWidthInt >= 920) {
            setGridHeight(dropZone, rowImages, limit - 4);
        } else {
            setGridHeight(dropZone, rowImages, limit - 5);
        }
    }

    // Event listener for window resize
    window.addEventListener("resize", function () {
        // Update screenWidthInt on resize
        screenWidthInt = window.innerWidth;

        // Update drop zone height for each drop zone on resize
        dropZones.forEach((dropZone) => {
            const row = dropZone.closest(".row");
            const rowImages = row.querySelectorAll(".pokemon");
            updateDropZoneHeight(dropZone, rowImages, 10);
        });
    });

    // Add drag-and-drop functionality to drop zones
    dropZones.forEach((dropZone) => {
        dropZone.addEventListener("dragover", (event) => {
            // Prevent the default behavior to enable dropping
            event.preventDefault();
            dropZone.classList.add("active");
        });
    
        dropZone.addEventListener("dragleave", (event) => {
            // Prevent the default behavior to enable dropping
            event.preventDefault();
            // Reset drop zone height on drag leave
            const row = dropZone.closest(".row");
            const rowImages = row.querySelectorAll(".pokemon");
            updateDropZoneHeight(dropZone, rowImages, 11);
    
            // Remove the "active" class when leaving the drop zone
            dropZone.classList.remove("active");
        });
    
        dropZone.addEventListener("drop", (event) => {
            // Prevent the default behavior to enable dropping
            event.preventDefault();
            const pokemonId = event.dataTransfer.getData("text/plain");
            const pokemonImage = document.querySelector(`[data-id="${pokemonId}"]`);
            const row = dropZone.closest(".row");
            const rowImages = row.querySelectorAll(".pokemon");
    
            // Update drop zone height and add the Pokemon image
            updateDropZoneHeight(dropZone, rowImages, 9);
            dropZone.appendChild(pokemonImage);
    
            // Remove the "active" class from the drop zone
            dropZone.classList.remove("active");
        });
    });

    // Add drag-and-drop functionality to the Pokemon list
    pokemonList.addEventListener("dragover", (event) => {
        // Prevent the default behavior to enable dropping
        event.preventDefault();
        pokemonList.classList.add("active");
    });

    pokemonList.addEventListener("dragleave", () => {
        // Remove the "active" class when leaving the Pokemon list
        pokemonList.classList.remove("active");
    });

    pokemonList.addEventListener("drop", (event) => {
        // Prevent the default behavior to enable dropping
        event.preventDefault();
        const pokemonId = event.dataTransfer.getData("text/plain");
        const pokemonImage = document.querySelector(`[data-id="${pokemonId}"]`);

        // Add the dropped Pokemon image to the Pokemon list
        pokemonList.appendChild(pokemonImage);
    });


    // SETTINGS
    document.addEventListener("click", async (event) => {
        const target = event.target;
        if (target.classList.contains("settings")) {
            // Prevent the default behavior of the settings icon
            event.preventDefault();

            // Show the overlay when the settings icon is clicked
            showOverlay();

            try {
                // Fetch the content of the settings.html file
                const response = await fetch('assets/settingWindow.html');

                if (!response.ok) {
                    throw new Error(`Failed to fetch settings.html: ${response.status} ${response.statusText}`);
                }

                // Get the HTML content from the response
                const htmlContent = await response.text();

                // Create a new container for the settings content
                const settingsContainer = document.createElement('div');
                settingsContainer.classList.add("settings-container");
                settingsContainer.innerHTML = htmlContent;
                settingsContainer.style.zIndex = "1000 !important;";

                // Insert the settings content into the page
                document.body.appendChild(settingsContainer);

                // Add a click event listener to the close button
                const closeButton = document.querySelector(".close-button");
                closeButton.addEventListener("click", () => {
                    // Hide the overlay and remove the settings container
                    hideOverlay();
                    settingsContainer.remove();
                });

                // Add click event listeners for color pickers
                const colorPickers = document.querySelectorAll(".colors");
                colorPickers.forEach((colorPicker, index) => {
                    colorPicker.addEventListener("click", () => {
                        // Get the selected color from the color picker
                        const selectedColor = getComputedStyle(colorPicker).backgroundColor;
                        const tierId = target.dataset.tier;

                        // Set the background color of the corresponding tier
                        const tierElement = document.querySelector(`.row[data-id="${tierId}"] .tier`);
                        tierElement.style.backgroundColor = selectedColor;
                    });
                });

                // Add input event listener for tier name
                const tierNameInput = document.querySelector("#tier-name");
                tierNameInput.addEventListener("input", () => {
                    // Get the tier ID from the settings icon's data attribute
                    const tierId = target.dataset.tier;

                    // Update the tier name in the corresponding row
                    const tierElement = document.querySelector(`.row[data-id="${tierId}"] .tier`);
                    tierElement.textContent = tierNameInput.value;
                });


                // Random 8 characters id generator
                function uniqueIdGenerator() {
                    let uniqueId = '';
    
                    for (let i = 0; i < 8; i++) {
                        let digit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
                        uniqueId += digit;
                    }
    
                    return uniqueId;
                }

                // Function to add drag-and-drop functionality to a drop zone
                function addDragAndDropToDropZone(dropZone) {
                    dropZone.addEventListener("dragover", (event) => {
                        // Prevent the default behavior to enable dropping
                        event.preventDefault();
                        dropZone.classList.add("active");
                    });

                    dropZone.addEventListener("dragleave", (event) => {
                        // Prevent the default behavior to enable dropping
                        event.preventDefault();
                        // Reset drop zone height on drag leave
                        const row = dropZone.closest(".row");
                        const rowImages = row.querySelectorAll(".pokemon");
                        updateDropZoneHeight(dropZone, rowImages, 11);

                        // Remove the "active" class when leaving the drop zone
                        dropZone.classList.remove("active");
                    });

                    dropZone.addEventListener("drop", (event) => {
                        // Prevent the default behavior to enable dropping
                        event.preventDefault();
                        const pokemonId = event.dataTransfer.getData("text/plain");
                        const pokemonImage = document.querySelector(`[data-id="${pokemonId}"]`);
                        const row = dropZone.closest(".row");
                        const rowImages = row.querySelectorAll(".pokemon");

                        // Update drop zone height and add the Pokemon image
                        updateDropZoneHeight(dropZone, rowImages, 9);
                        dropZone.appendChild(pokemonImage);

                        // Remove the "active" class from the drop zone
                        dropZone.classList.remove("active");
                    });
                }

                // Function to add a new row above the selected row
                function addRowAbove(selectedRow) {
                    const newRow = document.createElement("div");
                    newRow.classList.add("row");
                    const newTier = `new-tier-`+ uniqueIdGenerator();
                    newRow.dataset.id = newTier;
                    newRow.innerHTML = `
                        <div class="tier" id="${newTier}">New Tier</div>
                        <div class="drop-zone"></div>
                        <i class="fas fa-cog settings" data-tier="${newTier}"></i>
                    `;
                    selectedRow.parentNode.insertBefore(newRow, selectedRow);

                    // Add drag-and-drop functionality to the new drop zone
                    const newDropZone = newRow.querySelector(".drop-zone");
                    addDragAndDropToDropZone(newDropZone);
                }

                // Function to add a new row below the selected row
                function addRowBelow(selectedRow) {
                    const newRow = document.createElement("div");
                    newRow.classList.add("row");
                    const newTier = `new-tier-`+ uniqueIdGenerator();
                    newRow.dataset.id = newTier;
                    newRow.innerHTML = `
                        <div class="tier" id="${newTier}">New Tier</div>
                        <div class="drop-zone"></div>
                        <i class="fas fa-cog settings" data-tier="${newTier}"></i>
                    `;
                    selectedRow.parentNode.insertBefore(newRow, selectedRow.nextSibling);

                    // Add drag-and-drop functionality to the new drop zone
                    const newDropZone = newRow.querySelector(".drop-zone");
                    addDragAndDropToDropZone(newDropZone);
                }

                // Function to delete the row above the selected row
                function deleteRowAbove(selectedRow) {
                    const previousRow = selectedRow.previousElementSibling;
                    if (previousRow) {
                        previousRow.remove();
                    }
                }

                // Function to delete the row below the selected row
                function deleteRowBelow(selectedRow) {
                    const nextRow = selectedRow.nextElementSibling;
                    if (nextRow) {
                        nextRow.remove();
                    }
                }

                // Add click event listeners for row manipulation buttons
                const addRowAboveButton = document.querySelector("#add-row-above");
                addRowAboveButton.addEventListener("click", () => {
                    const tierId = target.dataset.tier;
                    const selectedRow = document.querySelector(`.row[data-id="${tierId}"]`);
                    addRowAbove(selectedRow);
                });

                const deleteRowAboveButton = document.querySelector("#delete-row-above");
                deleteRowAboveButton.addEventListener("click", () => {
                    const tierId = target.dataset.tier;
                    const selectedRow = document.querySelector(`.row[data-id="${tierId}"]`);
                    deleteRowAbove(selectedRow);
                });

                const addRowBelowButton = document.querySelector("#add-row-below");
                addRowBelowButton.addEventListener("click", () => {
                    const tierId = target.dataset.tier;
                    const selectedRow = document.querySelector(`.row[data-id="${tierId}"]`);
                    addRowBelow(selectedRow);
                });

                const deleteRowBelowButton = document.querySelector("#delete-row-below");
                deleteRowBelowButton.addEventListener("click", () => {
                    const tierId = target.dataset.tier;
                    const selectedRow = document.querySelector(`.row[data-id="${tierId}"]`);
                    deleteRowBelow(selectedRow);
                });

            } catch (error) {
                console.error('Error loading settings.html:', error);
            }
        }
    });

    // This doesn't work :(
    // Minimum width
    const MIN_WINDOW_WIDTH = 520; // Specify your minimum width here

    function adjustWindowWidth() {
        if (window.innerWidth < MIN_WINDOW_WIDTH) {
            window.resizeTo(MIN_WINDOW_WIDTH, window.innerHeight);
        }
    }

    // Listen for the window resize event
    window.addEventListener('resize', adjustWindowWidth);

    // Adjust the window width when the page initially loads
    window.addEventListener('load', adjustWindowWidth);

});

