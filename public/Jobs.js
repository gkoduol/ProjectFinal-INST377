async function saveJob(title, company, location, url) {
    await fetch('/api/saved-jobs', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        company: company,
        location: location,
        url: url,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((result) => result.json());
  
    alert('Job saved!');
  }
  
  async function loadJobData() {
    const search = document.getElementById('searchInput').value;
    const location = document.getElementById('locationInput').value;
  
    await fetch(`/api/jobs?search=${search}&location=${location}`)
      .then((result) => result.json())
      .then((resultJson) => {
        const table = document.createElement('table');
        table.setAttribute('id', 'jobInfo');
  
        const tableRow = document.createElement('tr');
  
        const titleHeader = document.createElement('th');
        titleHeader.innerHTML = 'Job Title';
  
        const companyHeader = document.createElement('th');
        companyHeader.innerHTML = 'Company';
  
        const locationHeader = document.createElement('th');
        locationHeader.innerHTML = 'Location';
  
        const actionHeader = document.createElement('th');
        actionHeader.innerHTML = 'Actions';
  
        tableRow.appendChild(titleHeader);
        tableRow.appendChild(companyHeader);
        tableRow.appendChild(locationHeader);
        tableRow.appendChild(actionHeader);
  
        table.appendChild(tableRow);
  
        resultJson.forEach((job) => {
          const jobRow = document.createElement('tr');
  
          const jobTitle = document.createElement('td');
          jobTitle.innerHTML = job.title;
  
          const jobCompany = document.createElement('td');
          jobCompany.innerHTML = job.company;
  
          const jobLocation = document.createElement('td');
          jobLocation.innerHTML = job.location;
  
          const jobActions = document.createElement('td');
  
          const viewLink = document.createElement('a');
          viewLink.href = job.redirect_url;
          viewLink.target = '_blank';
          viewLink.innerHTML = 'View';
  
          const saveButton = document.createElement('button');
          saveButton.innerHTML = 'Save';
          saveButton.onclick = function () {
            saveJob(job.title, job.company, job.location, job.redirect_url);
          };
  
          jobActions.appendChild(viewLink);
          jobActions.appendChild(document.createTextNode(' '));
          jobActions.appendChild(saveButton);
  
          jobRow.appendChild(jobTitle);
          jobRow.appendChild(jobCompany);
          jobRow.appendChild(jobLocation);
          jobRow.appendChild(jobActions);
  
          table.appendChild(jobRow);
        });
  
        const preExistingTable = document.getElementById('jobInfo');
        if (preExistingTable) {
          preExistingTable.remove();
        }
  
        document.body.appendChild(table);
      });
  }
  