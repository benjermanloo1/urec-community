import os

import boto3

# s3_client = boto3.client("s3")
s3 = boto3.resource("s3")

for bucket in s3.buckets.all():
    print(bucket.name)

with open("images/ichigo.jpg", "rb") as data:
    s3.Bucket("urec-community").put_object(Key="ichigo.jpg", Body=data)
