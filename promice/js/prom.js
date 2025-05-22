function fetchData1() {
            return new Promise(resolve => {
                setTimeout(() => resolve(10), 1000);
            });
        }

        function fetchData2(prevResult) {
            return new Promise(resolve => {
                setTimeout(() => resolve(prevResult * 2), 1000);
            });
        }

        function fetchData3(prevResult) {
            return new Promise(resolve => {
                setTimeout(() => resolve(prevResult + 5), 1000);
            });
        }

        document.getElementById('zapusk').addEventListener('click', async () => {
            const output = document.getElementById('output');
            output.innerHTML = 'Вычисляем<br>';
            
            const result1 = await fetchData1();
            output.innerHTML += `fetchData1: ${result1}<br>`;
                
            const result2 = await fetchData2(result1);
            output.innerHTML += `fetchData2: ${result2}<br>`;
                
            const result3 = await fetchData3(result2);
            output.innerHTML += `fetchData3: ${result3}<br>`;
                
            output.innerHTML += 'Успешно';
        });