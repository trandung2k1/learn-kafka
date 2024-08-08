const kafka = require('../kafka/client');
const {
    PartitionAssigners: { roundRobin },
} = require('kafkajs');
async function init() {
    //default roundRobin
    const consumer = kafka.consumer({
        // GroupId là mã định danh duy nhất cho một nhóm người tiêu dùng.
        // Người tiêu dùng có cùng groupId sẽ tạo thành một nhóm người tiêu dùng và làm việc cùng nhau để sử dụng các phân vùng của chủ đề.
        groupId: 'my-group',
        partitionAssigners: [roundRobin],
    });
    await consumer.connect();

    // fromBeginning -  Người tiêu dùng sẽ bắt đầu đọc tin nhắn từ đầu chủ đề, tức là từ phần bù sớm nhất có sẵn. Điều này có nghĩa là nó sẽ đọc tất cả các tin nhắn từ đầu chủ đề.
    await consumer.subscribe({ topics: ['my-topic'], fromBeginning: true });
    await consumer.run({
        // autoCommit: true, //Tùy chọn boolean này kiểm soát xem người tiêu dùng có tự động thực hiện bù trừ sau khi xử lý tin nhắn hay không. Theo mặc định, nó được đặt thành đúng. Nếu được đặt thành sai, bạn cần phải cam kết bù trừ theo cách thủ công.
        // autoCommitInterval: 5000, // Tùy chọn này chỉ định khoảng thời gian tính bằng mili giây mà tại đó người tiêu dùng sẽ tự động cam kết bù trừ nếu tính năng tự động Cam kết được bật. Nếu được đặt thành null, khoảng thời gian sẽ bị tắt. Giá trị mặc định là 5000 mili giây
        // eachBatchAutoResolve: true, // Tùy chọn boolean này xác định xem người tiêu dùng có nên tự động giải quyết sau khi xử lý từng lô hay không. Theo mặc định, nó được đặt thành đúng.
        // partitionsConsumedConcurrently: 1, // Tùy chọn này chỉ định số lượng phân vùng mà người dùng sẽ xử lý đồng thời. Giá trị mặc định là 1. Việc tăng giá trị này có thể cải thiện thông lượng nếu người tiêu dùng có khả năng xử lý đồng thời nhiều phân vùng
        // Xử lý tin nhắn theo đợt thay vì xử lý từng tin nhắn 1
        // eachBatch: async ({
        //     batch,
        //     resolveOffset,
        //     heartbeat,
        //     commitOffsetsIfNecessary,
        //     uncommittedOffsets,
        //     isRunning,
        //     isStale,
        // }) => {
        //     // Process each batch of messages
        //     for (let message of batch.messages) {
        //         console.log({
        //             value: message.value.toString(),
        //         });
        //         resolveOffset(message.offset);
        //         await heartbeat();
        //     }
        //     await commitOffsetsIfNecessary();
        // },

        //  Đây là chức năng xử lý từng tin nhắn riêng lẻ nhận được từ Kafka. Đây là phương pháp phổ biến nhất để xử lý tin nhắn
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`TOPIC : [${topic}]: PART:${partition}:`, message.value.toString());
        },
    });
}

init();
