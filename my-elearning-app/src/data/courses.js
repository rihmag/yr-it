

 const getCourses = async () => {
  try {
    const response = await fetch('https://backend-1-bn9o.onrender.com/api/course/allcourses');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export { getCourses };