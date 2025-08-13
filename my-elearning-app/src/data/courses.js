

 const getCourses = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/course/allcourses');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export { getCourses };