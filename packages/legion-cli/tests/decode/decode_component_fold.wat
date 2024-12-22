(component $root
  (core module $MockMemory (;0;)
    (type (;0;) (func (param i32 i32 i32 i32) (result i32)))
    (memory $memory (;0;) 1)
    (export "realloc" (func $realloc))
    (export "memory" (memory $memory))
    (func $realloc (;0;) (type 0) (param i32 i32 i32 i32) (result i32)
      (i32.const 0)
    )
    (data (;0;) (i32.const 8) "Hello World!")
  )
  (core instance $memory (;0;) (instantiate $MockMemory))
  (type (;0;)
    (instance
      (export (;0;) "error" (type (sub resource)))
    )
  )
  (import "wasi:io/error@0.2.0" (instance $wasi:io/error@0.2.0 (;0;) (type 0)))
  (alias export $wasi:io/error@0.2.0 "error" (type $std::io::IoError (;1;)))
  (type (;2;) (own $std::io::IoError))
  (type $std::io::StreamError (;3;) (variant (case "last-operation-failed" 2) (case "closed")))
  (type (;4;)
    (instance
      (export (;0;) "input-stream" (type (sub resource)))
      (export (;1;) "output-stream" (type (sub resource)))
      (alias outer $root $std::io::StreamError (type (;2;)))
      (export (;3;) "stream-error" (type (eq 2)))
      (type (;4;) (borrow 1))
      (type (;5;) (list u8))
      (type (;6;) (result (error 3)))
      (type (;7;) (func (param "self" 4) (param "contents" 5) (result 6)))
      (export (;0;) "[method]output-stream.blocking-write-and-flush" (func (type 7)))
    )
  )
  (import "wasi:io/streams@0.2.0" (instance $wasi:io/streams@0.2.0 (;1;) (type 4)))
  (alias export $wasi:io/streams@0.2.0 "input-stream" (type $std::io::InputStream (;5;)))
  (alias export $wasi:io/streams@0.2.0 "output-stream" (type $std::io::OutputStream (;6;)))
  (alias export $wasi:io/streams@0.2.0 "[method]output-stream.blocking-write-and-flush" (func $std::io::OutputStream::write (;0;)))
  (type (;7;)
    (instance
      (alias outer $root $std::io::OutputStream (type (;0;)))
      (type (;1;) (own 0))
      (type (;2;) (func (result 1)))
      (export (;0;) "get-stdout" (func (type 2)))
    )
  )
  (import "wasi:cli/stdout@0.2.0" (instance $wasi:cli/stdout@0.2.0 (;2;) (type 7)))
  (alias export $wasi:cli/stdout@0.2.0 "get-stdout" (func $std::io::standard_output (;1;)))
  (alias export $wasi:io/streams@0.2.0 "[method]output-stream.blocking-write-and-flush" (func (;2;)))
  (alias core export $memory "memory" (core memory (;0;)))
  (alias core export $memory "realloc" (core func (;0;)))
  (core func $std::io::OutputStream::write (;1;) (canon lower (func 2) (memory 0) (realloc 0)))
  (alias export $wasi:cli/stdout@0.2.0 "get-stdout" (func (;3;)))
  (core func $std::io::standard_output (;2;) (canon lower (func 3)))
  (core module $Main (;1;)
    (type (;0;) (func (param i32 i32 i32 i32)))
    (type (;1;) (func (result i32)))
    (type (;2;) (func))
    (import "wasi:io/streams@0.2.0" "[method]output-stream.blocking-write-and-flush" (func $std::io::OutputStream::write (;0;) (type 0)))
    (import "wasi:cli/stdout@0.2.0" "get-stdout" (func $std::io::standard_output (;1;) (type 1)))
    (export "main" (func $main))
    (start $main)
    (func $main (;2;) (type 2)
      (call $std::io::OutputStream::write
        (call $std::io::standard_output)
        (i32.const 8)
        (i32.const 12)
        (i32.const 0))
    )
  )
  (core instance (;1;)
    (export "[method]output-stream.blocking-write-and-flush" (func $std::io::OutputStream::write))
  )
  (core instance (;2;)
    (export "get-stdout" (func $std::io::standard_output))
  )
  (core instance $main (;3;) (instantiate $Main
      (with "wasi:io/streams@0.2.0" (instance 1))
      (with "wasi:cli/stdout@0.2.0" (instance 2))
    )
  )
)
