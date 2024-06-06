let myChart; // Variabel untuk menyimpan objek chart
let myChart1;
let myChart2;
let myChart3;
let myChart4;
let myChart5;
let myChart6;
let myChartTopCities;
let myChartProfitDiscount;

function updateChart() {
  const selectedState = document.getElementById('stateSelect').value;
  const selectedYear = document.getElementById('yearFilter').value;

    fetch('/dataset.json')
        .then(response => response.json())
        .then(data => {
        // Filter data berdasarkan negara bagian yang dipilih
        let filteredData;
        if (selectedState === '') {
          filteredData = data;
        } else {
          filteredData = data.filter(item => item.State === selectedState);
        }

        // Filter data berdasarkan tahun yang dipilih
        if (selectedYear && selectedYear !== '') {
            filteredData = filteredData.filter(item => {
            const year = new Date(item.Order_Date).getFullYear();
            return year == selectedYear;
            });
        }

        // Hitung total profit, sales, quantity, dan order ID
        const totalProfit = filteredData.reduce((acc, item) => acc + item.Profit, 0);
        const totalSales = filteredData.reduce((acc, item) => acc + item.Sales, 0);
        const totalQuantity = filteredData.reduce((acc, item) => acc + item.Quantity, 0);
        const totalOrderIds = [...new Set(filteredData.map(item => item.Order_ID))].length;

        // Update card values
        document.getElementById('Card-1').textContent = `$${totalProfit.toFixed(2)}`;
        document.getElementById('Card-2').textContent = `$${totalSales.toFixed(2)}`;
        document.getElementById('Card-3').textContent = `${totalQuantity}`;
        document.getElementById('Card-4').textContent = `${totalOrderIds}`;

        // Group data by year and calculate total profit per year
        const profitByYear = filteredData.reduce((acc, item) => {
            const year = new Date(item.Order_Date).getFullYear();
            acc[year] = (acc[year] || 0) + item.Profit;
            return acc;
        }, {});

        // Group data by year and calculate total quantity per year
        const quantityByYear = filteredData.reduce((acc, item) => {
            const year = new Date(item.Order_Date).getFullYear();
            acc[year] = (acc[year] || 0) + item.Quantity;
            return acc;
        }, {});

        // Group data by year and calculate total sales per year
        const salesByYear = filteredData.reduce((acc, item) => {
          const year = new Date(item.Order_Date).getFullYear();
          acc[year] = (acc[year] || 0) + item.Sales;
          return acc;
        }, {});

        // Group data by category and calculate total profit per category per year
        const profitByCategoryAndYear = filteredData.reduce((acc, item) => {
            const year = new Date(item.Order_Date).getFullYear();
            if (!acc[year]) {
            acc[year] = {
                'Office Supplies': 0,
                'Technology': 0,
                'Furniture': 0
            };
            }
            acc[year][item.Category] += item.Profit;
            return acc;
        }, {});

        // Group data by category and calculate total sales per category per year
        const salesByCategoryAndYear = filteredData.reduce((acc, item) => {
            const year = new Date(item.Order_Date).getFullYear();
            if (!acc[year]) {
            acc[year] = {
                'Office Supplies': 0,
                'Technology': 0,
                'Furniture': 0
            };
            }
            acc[year][item.Category] += item.Sales;
            return acc;
        }, {});

        // Group data by city and calculate total profit per city
        const profitByCity = filteredData.reduce((acc, item) => {
          const city = item.City;
          acc[city] = (acc[city] || 0) + item.Profit;
          return acc;
        }, {});

        // Sort cities by profit in descending order and select top 5
        const sortedCities = Object.keys(profitByCity).sort((a, b) => profitByCity[b] - profitByCity[a]).slice(0, 5);

        // Group data by year and city for top 5 cities
        const profitByYearAndCity = filteredData.reduce((acc, item) => {
          const year = new Date(item.Order_Date).getFullYear();
          const city = item.City;
          if (sortedCities.includes(city)) {
            if (!acc[year]) {
              acc[year] = {};
            }
            acc[year][city] = (acc[year][city] || 0) + item.Profit;
          }
          return acc;
        }, {});

        // Group data by year and calculate total profit and discount per year
        const profitByDiscount = filteredData.reduce((acc, item) => {
          const year = new Date(item.Order_Date).getFullYear();
          acc[year] = acc[year] || { profit: 0, discount: 0 };
          acc[year].profit += item.Profit;
          acc[year].discount += item.Discount;
          return acc;
        }, {});


        // Prepare data for chart
        const labels = Object.keys(profitByYear);
        const values = Object.values(profitByYear);

        const labels1 = Object.keys(quantityByYear);
        const values1 = Object.values(quantityByYear);

        const labels2 = Object.keys(salesByYear);
        const values2 = Object.values(salesByYear);

        const discounts = filteredData.map(item => item.Discount);
        const profits = filteredData.map(item => item.Profit);
        const dates = filteredData.map(item => new Date(item.Order_Date).toLocaleDateString());

        const years2 = Object.keys(profitByYearAndCity);
        const cityData = sortedCities.map(city => ({
        label: city,
        data: years2.map(year => profitByYearAndCity[year][city] || 0),
        borderColor: getRandomColor(), // Function to generate random color for each city
        borderWidth: 1,
        fill: false
        }));

        const years3 = Object.keys(profitByDiscount);
        const profitData = years3.map(year => profitByDiscount[year].profit);
        const discountData = years3.map(year => profitByDiscount[year].discount);

        const years = Object.keys(profitByCategoryAndYear);
        const officeSuppliesData = years.map(year => profitByCategoryAndYear[year]['Office Supplies']);
        const technologyData = years.map(year => profitByCategoryAndYear[year]['Technology']);
        const furnitureData = years.map(year => profitByCategoryAndYear[year]['Furniture']);

        const years1 = Object.keys(salesByCategoryAndYear);
        const officeSuppliesData1 = years.map(year => salesByCategoryAndYear[year]['Office Supplies']);
        const technologyData1 = years.map(year => salesByCategoryAndYear[year]['Technology']);
        const furnitureData1 = years.map(year => salesByCategoryAndYear[year]['Furniture']);
        

        // Hapus chart sebelumnya jika sudah ada
        if (myChart) {
            myChart.destroy();
        }
        
        if (myChart1) {
            myChart1.destroy();
        }

        if (myChart2) {
            myChart2.destroy();
        }

        if (myChart3) {
            myChart3.destroy();
        }

        if (myChart4) {
          myChart4.destroy();
        }

        if (myChart5) {
          myChart5.destroy();
        }

        if (myChartTopCities) {
          myChartTopCities.destroy();
        }
       
        if (myChartProfitDiscount) {
          myChartProfitDiscount.destroy();
        }


        // Buat chart baru untuk profit
        const ctx = document.getElementById('myChart-1').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels,
            datasets: [{
                label: `Profit by Year (${selectedState} - ${selectedYear || 'All Years'})`,
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Profit',
                  color: '#1B9C85'
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: '#1B9C85' // Mengubah warna tulisan sumbu Y menjadi biru
                  }
                },
                x: {
                  ticks: {
                    color: '#1B9C85'
                  },
                }
            },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
            }
        });

        // Buat chart baru untuk quantity
        const ctr = document.getElementById('myChart-2').getContext('2d');
        myChart1 = new Chart(ctr, {
            type: 'bar',
            data: {
            labels: labels1, // Mengubah labels1 menjadi labels
            datasets: [{
                label: `Quantity by Year (${selectedState} - ${selectedYear || 'All Years'})`,
                data: values1,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1
            }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Quantity',
                  color: 'rgb(54, 162, 235)'
                }
              },
            scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: 'rgb(54, 162, 235)' // Mengubah warna tulisan sumbu Y menjadi biru
                  }
                },
                x: {
                  ticks: {
                    color: 'rgb(54, 162, 235)'
                  },
                }
            },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
            }
        });

        // Buat chart baru untuk sales
        const ctr4 = document.getElementById('myChart-3').getContext('2d');
        myChart4 = new Chart(ctr4, {
            type: 'line',
            data: {
            labels: labels2,
            datasets: [{
                label: `Sales by Year (${selectedState} - ${selectedYear || 'All Years'})`,
                data: values2,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Sales',
                  color: 'rgba(255, 99, 132, 1)'
                }
              },
              scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: 'rgba(255, 99, 132, 1)' // Mengubah warna tulisan sumbu Y menjadi biru
                    }
                  },
                  x: {
                    ticks: {
                      color: 'rgba(255, 99, 132, 1)'
                    },
                  }
              },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
            }
        });


        // Buat chart baru untuk profit by category
        const ctr2 = document.getElementById('myChart-5').getContext('2d');
        myChart2 = new Chart(ctr2, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
            label: 'Office Supplies',
            data: officeSuppliesData,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
            }, {
            label: 'Technology',
            data: technologyData,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
            }, {
            label: 'Furniture',
            data: furnitureData,
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
            }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Profit by Category',
              color: '#1B9C85'
            }
          },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#1B9C85' // Mengubah warna tulisan sumbu Y menjadi biru
                },
              },
              x: {
                ticks: {
                  color: '#1B9C85'
                },
              }
            },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
          }
        });

        // Buat chart baru untuk sales by category
        const ctr3 = document.getElementById('myChart-4').getContext('2d');
        myChart3 = new Chart(ctr3, {
          type: 'line',
          data: {
            labels: years1,
            datasets: [{
              label: 'Office Supplies',
              data: officeSuppliesData1,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }, {
              label: 'Technology',
              data: technologyData1,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }, {
              label: 'Furniture',
              data: furnitureData1,
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Sales by Category',
                color: 'rgba(255, 99, 132, 1)'
              }
            },
            scales: {
              x: {
                ticks: {
                  color: 'rgba(255, 99, 132, 1)'
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: 'rgba(255, 99, 132, 1)' // Mengubah warna tulisan sumbu Y menjadi biru
                },
              }
            },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
          }
        });


        // Buat chart baru untuk profit by discount
        const ctr5 = document.getElementById('myChart-8').getContext('2d');
        myChart5 = new Chart(ctr5, {
          type: 'scatter',
          data: {
            datasets: [{
              label: `Profit by Discount (${selectedState} - ${selectedYear || 'All Years'})`,
              data: discounts.map((discount, index) => ({ x: discount, y: profits[index], date: dates[index] })),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                  color: 'rgb(153, 102, 255)'
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#1B9C85' // Mengubah warna tulisan sumbu Y menjadi biru
                },
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const dataPoint = tooltipItem.dataset.data[tooltipItem.dataIndex];
                    return `Date: ${dataPoint.date}\nDiscount: ${dataPoint.x}\nProfit: ${dataPoint.y}`;
                  }
                }
              },
              title: {
                display: true,
                text: 'Profit by discount',
                color: '#1B9C85'
              },
              
            },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
          }
        });

        // Buat chart baru untuk Profit by Top 5 City
        const ctxTopCities = document.getElementById('myChart-7').getContext('2d');
        myChartTopCities = new Chart(ctxTopCities, {
          type: 'line',
          data: {
            labels: years2,
            datasets: cityData,
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Profit by top 5 City',
                color: '#1B9C85'
              } 
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#1B9C85' // Mengubah warna tulisan sumbu Y menjadi biru
                },
              },
              x: {
                ticks: {
                  color: '#1B9C85' // Mengubah warna tulisan label sumbu X menjadi ungu
                }
              }
            },
            legend: {
              position: 'right' // Mengatur posisi legend di sebelah kanan
              
            },
            maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
          },
      });
      

      const ctxProfitDiscount = document.getElementById('myChart-6').getContext('2d');
      myChartProfitDiscount = new Chart(ctxProfitDiscount, {
        type: 'line',
        data: {
          labels: years3,
          datasets: [
            {
              label: 'Profit',
              data: profitData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
              fill: false,
              yAxisID: 'y-axis-profit' // Assign yAxisID for profit
            },
            {
              label: 'Discount',
              data: discountData,
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderWidth: 1,
              fill: false,
              yAxisID: 'y-axis-discount' // Assign yAxisID for discount
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Profit by discount',
              color: '#1B9C85'
            }
          },
          scales: {
            yAxes: [
              {
                id: 'y-axis-profit',
                position: 'left',
                title: {
                  display: true,
                  text: 'Profit',
                  color: 'rgb(153, 102, 255)' // Ubah warna tulisan judul sumbu Y menjadi ungu
                },
                ticks: {
                  beginAtZero: true
                }
              },
              {
                id: 'y-axis-discount',
                position: 'right',
                title: {
                  display: true,
                  text: 'Discount',
                  color: '#1B9C85' // Ubah warna tulisan judul sumbu Y menjadi hijau tua
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ],
            x: {
              ticks: {
                color: '#1B9C85' // Mengubah warna tulisan label sumbu X menjadi ungu
              }
            }
          },
          maintainAspectRatio: false // Menonaktifkan aspek rasio untuk penyesuaian ukuran chart
        }
      });
      

    });
}

// Panggil updateChart() secara otomatis setelah halaman dimuat
document.addEventListener('DOMContentLoaded', updateChart);

// Fungsi untuk menghasilkan warna acak
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}