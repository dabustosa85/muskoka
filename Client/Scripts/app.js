// Custom JavaScript

// IIFE -- Immediately Invoked Function Expression Example
(function () {
  function Start() {
    console.info(`App Started!`);

    const fields = document.querySelectorAll(
      "#survey-pet-name, #survey-pet-type, #survey-breed-size, #survey-age-range, #survey-pet-weight"
    );
    fields.forEach((field) => {
      field.addEventListener("input", checkFieldsAndToggleSubmit);
    });

    function checkFieldsAndToggleSubmit() {
      let allFilled = true;
      fields.forEach((field) => {
        if (!field.value) allFilled = false;
      });

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

        const averageWeightRange = weightRanges[petType][breedSize][ageRange];
        const averageWeight =
          (averageWeightRange[0] + averageWeightRange[1]) / 2;
        let recommendation = "";

        if (petWeight < averageWeightRange[0]) {
          recommendation = "increasing";
        } else if (petWeight > averageWeightRange[1]) {
          recommendation = "decreasing";
        } else {
          recommendation = "maintaining";
        }

        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML = `
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Thank you for completing the survey!</h4>
          <p>Received information:</p>
          <hr>
          <div class="mb-0">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Pet's Name:</th>
                  <td>${petName}</td>
                </tr>
                <tr>
                  <th scope="row">Pet Type:</th>
                  <td>${petType}</td>
                </tr>
                <tr>
                  <th scope="row">Size:</th>
                  <td>${breedSize}</td>
                </tr>
                <tr>
                  <th scope="row">Age:</th>
                  <td>${ageRange}</td>
                </tr>
                <tr>
                  <th scope="row">Weight:</th>
                  <td>${petWeight}kg</td>
                </tr>
                <tr>
                  <th scope="row">Activity:</th>
                  <td>${recommendation}</td>
                </tr>
                <tr>
                  <th scope="row">Weight Range:</th>
                  <td>${petName} is in the ${
          recommendation === "maintaining" ? "expected" : recommendation
        } weight range.</td>
                </tr>
                <tr>
                  <th scope="row">Recommendation:</th>
                  <td>We recommend ${recommendation} their activity level.</td>
                </tr>
              </tbody>
            </table>
            Would you like a professional to review your pet? <a href="#" class="btn btn-primary btn-sm">Click here</a> to book your veterinary consultation.
          </div>
        </div>
        `;
      });
  }

  window.addEventListener("load", Start);
})();
