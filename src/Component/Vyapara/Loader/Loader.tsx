import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Loader = () => {
    useEffect(() => {
        let timerInterval: NodeJS.Timer | undefined;
    
        Swal.fire({
          title: "Loading...",
          html: "Please wait while we process your request.",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
          },
          willClose: () => {
            if (timerInterval) clearInterval(timerInterval);
          },
        });
    
        // Cleanup on component unmount
        return () => {
          Swal.close();
          if (timerInterval) clearInterval(timerInterval);
        };
      }, []);
    
      return null; 
}

export default Loader