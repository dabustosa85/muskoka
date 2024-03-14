// Custom JavaScript
function handlePetTypeSelection() {
  const petTypeImages = document.querySelectorAll(".pet-type-image");
  petTypeImages.forEach((image) => {
    image.addEventListener("click", function () {
      petTypeImages.forEach((img) => img.classList.remove("selected"));
      this.classList.add("selected");

      const petType = this.getAttribute("data-pet-type");
      document.getElementById("survey-pet-type").value = petType;

      checkFieldsAndToggleSubmit();
    });
  });
}

// IIFE -- Immediately Invoked Function Expression Example
(function () {
  function Start() {
    console.info(`App Started!`);

    handlePetTypeSelection();

    const fields = document.querySelectorAll(
      "#survey-pet-name, #survey-pet-type, #survey-breed-size, #survey-age-range, #survey-pet-weight, #survey-activity-level"
    );
    fields.forEach((field) => {
      field.addEventListener("input", checkFieldsAndToggleSubmit);
    });

    function checkFieldsAndToggleSubmit() {
      const allFilled = Array.from(fields).every((field) => field.value !== "");
      const submitBtn = document.getElementById("survey-submit-btn");
      submitBtn.disabled = !allFilled;
    }

    document
      .getElementById("survey-submit-btn")
      .addEventListener("click", function () {
        const petName = document.getElementById("survey-pet-name").value;
        const petType = document.getElementById("survey-pet-type").value;
        const breedSize = document.getElementById("survey-breed-size").value;
        const ageRange = document.getElementById("survey-age-range").value;
        const petWeight = parseFloat(
          document.getElementById("survey-pet-weight").value
        );
        const activityLevel = document.getElementById(
          "survey-activity-level"
        ).value;

        const weightRanges = {
          cat: {
            small: {
              "kitten-puppy": [0.75, 2.25],
              adult: [2.5, 4],
              senior: [2.5, 4],
            },
            medium: {
              "kitten-puppy": [1.25, 3],
              adult: [4, 6.25],
              senior: [4, 6.25],
            },
            large: {
              "kitten-puppy": [2, 3.25],
              adult: [4.75, 9],
              senior: [4.75, 9],
            },
          },
          dog: {
            small: {
              "kitten-puppy": [0.75, 1.25],
              adult: [1.75, 3.25],
              senior: [1.75, 3.25],
            },
            medium: {
              "kitten-puppy": [4, 5],
              adult: [10, 14.5],
              senior: [10, 14.5],
            },
            large: {
              "kitten-puppy": [4.5, 13],
              adult: [25, 35],
              senior: [25, 35],
            },
          },
        };

        const activityAdjustment = {
          none: 0.85,
          low: 0.9,
          moderate: 1,
          high: 1.15,
        };

        const averageWeightRange = weightRanges[petType][breedSize][ageRange];
        const adjustedAverageWeight = [
          averageWeightRange[0] * activityAdjustment[activityLevel],
          averageWeightRange[1] * activityAdjustment[activityLevel],
        ];

        let recommendation = "";
        if (petWeight < adjustedAverageWeight[0]) {
          recommendation = "increase their food intake and monitor weight";
        } else if (petWeight > adjustedAverageWeight[1]) {
          recommendation = "decrease their food intake and increase exercise";
        } else {
          recommendation = "maintain their current diet and activity level";
        }

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Thank you for completing the survey!</h4>
        <p>Based on our assessment, here's what we think:</p>
        <hr>
        <p>${petName} seems to be in a ${
          recommendation === "maintain their current diet and activity level"
            ? "good"
            : "needs adjustment"
        } state regarding their weight. We recommend ${recommendation}.</p>
        <p>This is just a starting point. For a comprehensive health assessment, consulting with a veterinarian is the best course of action.</p>
        <div class="mt-4">
        <a href="#" class="btn btn-primary btn-sm">Click here</a> to book your veterinary consultation.
        </div>
      </div>
        `;
      });
  }

  window.addEventListener("load", Start);
})();
