const kafka = require('./client');
// Run admin and create topic
async function init() {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        waitForLeaders: false, // Nếu = true, cuộc gọi sẽ đợi người đứng đầu các phân vùng được bầu chọn trước khi quay lại. Điều này đảm bảo rằng các chủ đề đang hoạt động đầy đủ.
        validateOnly: false, // Nếu = true, các chủ đề sẽ chỉ được xác thực chứ không thực sự được tạo. Điều này rất hữu ích để kiểm tra xem yêu cầu tạo chủ đề có hợp lệ hay không mà không thực hiện bất kỳ thay đổi nào.
        // timeout: 5000,
        topics: [
            {
                topic: 'my-topic', // Tên chủ đề cần tạo.
                numPartitions: 2, // Số lượng phân vùng mà chủ đề nên có. Các phân vùng cho phép xử lý dữ liệu song song.
                replicationFactor: 2, // Số lượng bản sao (bản sao) dữ liệu của chủ đề. Điều này đảm bảo khả năng chịu lỗi và tính sẵn sàng cao.
                // configEntries: [
                //     // { name: 'cleanup.policy', value: 'compact' },
                //     // { name: 'min.insync.replicas', value: '2' },
                //     // { name: 'retention.ms', value: '604800000' }, // 7 days
                // ], // Một loạt các cài đặt cấu hình bổ sung cho chủ đề. Mỗi cấu hình là một cặp khóa-giá trị.
                // replicaAssignment,
            },
        ],
    });

    // Disconnect admin
    setTimeout(async () => {
        await admin.disconnect();
    }, 2000);
}

init();

// brokers: ['broker1:9092', 'broker2:9092', 'broker3:9092', 'broker4:9092', 'broker5:9092'];
// Topic replicaAssignment
// replicaAssignment: {
//       0: [1, 2, 3], // Partition 0 replicas on brokers 1, 2, and 3
//       1: [2, 3, 4], // Partition 1 replicas on brokers 2, 3, and 4
//       2: [3, 4, 5], // Partition 2 replicas on brokers 3, 4, and 5
//     },
