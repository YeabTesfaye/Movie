<AppBar sx={{ backgroundColor: "#9fa2bf" }}>
  <Toolbar>
    <Box width={"20%"}>
      <MovieIcon />
    </Box>
    <Box width={"30%"} margin={"auto"}>
      <Autocomplete
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            sx={{ input: { color: "#dfe4e6" } }}
            variant="standard"
            {...params}
            placeholder="Search Your Favorite Movie"
          />
        )}
      ></Autocomplete>
    </Box>
    <Box display="flex">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
      >
        <Tab LinkComponent={Link} to="/movies" label="movies" />
        <Tab LinkComponent={Link} to="/admin" label="Admin" />
        <Tab LinkComponent={Link} to="/auth" label="Auth" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Admin Goes Here
      </TabPanel>
    </Box>
  </Toolbar>
</AppBar>;
