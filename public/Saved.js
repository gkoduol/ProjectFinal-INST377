// Saved jobs table
async function loadSavedJobs() {
    await fetch('/api/saved-jobs')
      .then((result) => result.json())
      .then((resultJson) => {
        buildLocationChart(resultJson);
        const table = document.createElement('table');
        table.setAttribute('id', 'savedJobTable');
  
        const headerRow = document.createElement('tr');
  
        const titleHeader = document.createElement('th');
        titleHeader.innerHTML = 'Job Title';
  
        const companyHeader = document.createElement('th');
        companyHeader.innerHTML = 'Company';
  
        const locationHeader = document.createElement('th');
        locationHeader.innerHTML = 'Location';
  
        const linkHeader = document.createElement('th');
        linkHeader.innerHTML = 'Link';
  
        headerRow.appendChild(titleHeader);
        headerRow.appendChild(companyHeader);
        headerRow.appendChild(locationHeader);
        headerRow.appendChild(linkHeader);
  
        table.appendChild(headerRow);
  
        resultJson.forEach((job) => {
          const row = document.createElement('tr');
  
          const titleCell = document.createElement('td');
          titleCell.innerHTML = job.title;
  
          const companyCell = document.createElement('td');
          companyCell.innerHTML = job.company;
  
          const locationCell = document.createElement('td');
          locationCell.innerHTML = job.location;
  
          const linkCell = document.createElement('td');
          const link = document.createElement('a');
          link.href = job.url;
          link.target = '_blank';
          link.innerHTML = 'View Job';
  
          linkCell.appendChild(link);
  
          row.appendChild(titleCell);
          row.appendChild(companyCell);
          row.appendChild(locationCell);
          row.appendChild(linkCell);
  
          table.appendChild(row);
        });
  
        const existingTable = document.getElementById('savedJobTable');
        if (existingTable) {
          existingTable.remove();
        }
  
        document.getElementById('saved-results').appendChild(table);
      });
  }
//   Saved jobs chart by location
  function buildLocationChart(jobs) {
    const locationCounts = {};
  
    jobs.forEach((job) => {
      if (locationCounts[job.location]) {
        locationCounts[job.location]++;
      } else {
        locationCounts[job.location] = 1;
      }
    });
  
    const labels = Object.keys(locationCounts);
    const data = Object.values(locationCounts);
  
    const ctx = document.getElementById('jobsChart').getContext('2d');
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Saved Jobs',
            data: data,
            backgroundColor: '#b56576',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        // to bold the labels for the chart
        scales: {
          x: {
            ticks: {
              font: {
                weight: 'bold'
              }
            }
          }
        }
      },
    });
  }
  
  
  
  window.onload = loadSavedJobs;