const kafka = require('../kafka/client');

async function init() {
    const producer = kafka.producer();
    await producer.connect();
    console.log('Producer Connected Successfully');
    const topic = 'my-topic';
    await producer.send({
        topic, // Tên của chủ đề Kafka mà tin nhắn sẽ được gửi tới.
        //  0: Không cần xác nhận.
        //  1:Người lãnh đạo sẽ ghi lại bản ghi vào nhật ký cục bộ của mình nhưng sẽ phản hồi mà không cần chờ những người theo dõi sao chép.
        //  -1 hoặc all: Người đứng đầu sẽ đợi toàn bộ các bản sao đồng bộ để xác nhận bản ghi.
        // acks,
        //  Kiểu nén sử dụng cho tin nhắn. CompressionTypes là enum do KafkaJS cung cấp bao gồm các tùy chọn như GZIP, SNAPPY, LZ4, và ZSTD.
        // compression,
        // Một mảng các tin nhắn sẽ được gửi. Mỗi tin nhắn là một đối tượng thường bao gồm key, value, và tùy chọn headers.
        messages: [
            {
                // Vùng muốn gửi
                partition: 1, // Phân vùng cụ thể trong chủ đề nơi tin nhắn sẽ được gửi. Nếu không được chỉ định, Kafka sẽ xác định phân vùng dựa trên khóa hoặc sử dụng chiến lược phân vùng mặc định.
                key: 'hello', //  Chìa khóa của tin nhắn. Khóa thường được sử dụng để phân vùng trong Kafka. Các tin nhắn có cùng khóa thường được gửi đến cùng một phân vùng. Nó có thể là Bộ đệm, chuỗi hoặc null.
                value: Buffer.from('Hello, World!'), // Tải trọng thực tế của tin nhắn. Đây chính là nội dung chính mà bạn muốn gửi đến chủ đề. Nó có thể là Bộ đệm, chuỗi hoặc null.
                // headers //Tiêu đề tùy chỉnh cho tin nhắn. Tiêu đề là cặp khóa-giá trị trong đó cả khóa và giá trị đều là chuỗi. Tiêu đề có thể được sử dụng để thêm siêu dữ liệu vào tin nhắn.
                // timestamp,
            },
        ],
    });

    // Disconnect
    setTimeout(async () => {
        await producer.disconnect();
    }, 2000);
}

init();
