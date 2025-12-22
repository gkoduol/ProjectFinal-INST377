require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/Jobs.html"));
  });
  

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/api/jobs", async (req, res) => {
  const { search, location } = req.query;
  console.log("Search:", search);
  console.log("Location:", location);
  console.log("App ID:", process.env.ADZUNA_APP_ID);
  console.log("App Key exists:", !!process.env.ADZUNA_APP_KEY);


  try {
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&what=${search}&where=${location}`;

    const response = await fetch(url);
    const data = await response.json();

    const jobs = data.results.map(job => ({
      title: job.title,
      company: job.company?.display_name,
      location: job.location?.display_name,
      description: job.description,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      redirect_url: job.redirect_url,
      category: job.category?.label,
      created: job.created
    }));

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});
// post endpoint to save a job to supabase
app.post('/api/saved-jobs', async (req, res) => {
    const { title, company, location, url } = req.body;
  
    const { data, error } = await supabase
      .from('saved_jobs')
      .insert([
        { title, company, location, url }
      ])
      .select();
  
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save job' });
      return;
    }
  
    res.json(data);
  });
//  get endpoint to fetch saved jobs from supabase
  app.get('/api/saved-jobs', async (req, res) => {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select();
  
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch saved jobs' });
      return;
    }
  
    res.json(data);
  });

  module.exports = app;

