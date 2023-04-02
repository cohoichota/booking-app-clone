import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const fetchData = useCallback(async () => {
      setLoading(true);
      try {
         const res = await axios.get(url);
         setData(res.data);
      } catch (error) {
         setError(error);
      }
      setLoading(false);
   }, [url]);

   useEffect(() => {
      fetchData();
   }, [fetchData, url]);

   const reFetch = async () => {
      setLoading(true);
      try {
         const res = await axios.get(url);
         setData(res.data);
      } catch (error) {
         setError(error);
      }
      setLoading(false);
   };

   return { data, loading, error, reFetch };
};

export default useFetch;
